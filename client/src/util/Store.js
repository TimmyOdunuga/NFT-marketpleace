import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

const Store = {
  state: {
    cookies: false,
  },
  hooks: [],
  currentId: 0, // Keeps incrementing forever but fuckit

  /**
   * Applies the given state object to the store state.
   * Searches the cookies store for a state value then applies
   * the state value to this store.
   */
  populateDefaults(state) {
    if (state) {
      for (const property in state) {
        this.state[property] = state[property]
      }
    }
    const newStateJSON = Cookies.get('state')
    if (!newStateJSON) return this.state
    const newState = JSON.parse(newStateJSON)
    if (newState) {
      for (const property in newState) {
        this.state[property] = newState[property]
      }
    }
    return this.state
  },

  /**
   * Subscribes to a specific store state property. Store will
   * trigger the setState function whenever the property updates.
   * @param {string} property The state property to subscribe to
   * @param {function} setState The setstate function use
   * @returns id of the subscribed event
   */
  subscribe(property, setState) {
    this.currentId++
    this.hooks.push({
      id: this.currentId,
      property,
      setState,
    })
    return this.currentId
  },

  /**
   * Unsubscribes the hook with the specified id.
   * @param {number} id The id to deactivate
   * @returns All the hooks
   */
  unsubscribe(id) {
    this.hooks = this.hooks.filter((hook) => hook.id !== id)
    return this.hooks
  },

  /**
   * Triggers every hook that has subscribed to the specified
   * property.
   * @param {string} property The property that has changed
   */
  triggerHooks(property) {
    this.hooks.forEach((hook) => {
      if (hook.property !== property) return
      hook.setState(this.state[property])
    })
  },

  /**
   * Sets a property within the store and triggers all the
   * hooks that are linked to the property.
   * @param {string} property The property to set
   * @param {*} value The value to set the property
   * @returns The state property's value
   */
  setProperty(property, value) {
    this.state[property] = value
    this.triggerHooks(property)

    if (this.state.cookies) {
      Cookies.set('state', JSON.stringify(this.state), {
        secure: process.env.NODE_ENV === 'development' ? false : true,
      })
    }

    return this.state[property]
  },
}

/**
 * Sets the store's default state to the specified object.
 * @param {object} defaults Default state object to sync to the store
 */
export function setStoreDefaults(defaults) {
  return Store.populateDefaults(defaults)
}

export function setStore(property, value) {
  return Store.setProperty(property, value)
}

export function getStore(property) {
  const value = Store.state[property]
  return value
}

/**
 * Hook to use a store value as a synchronized state.
 * @param {string} property Store property to hook into
 * @returns
 */
export default function useStore(property) {
  const [state, setState] = useState(Store.state[property])

  useEffect(() => {
    const index = Store.subscribe(property, setState)
    return () => {
      Store.unsubscribe(index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Sets a property within the store.
   * @param {*} value The value to set the property
   * @returns The state property's value
   */
  function setStoreValue(value) {
    return Store.setProperty(property, value)
  }

  return [state, setStoreValue]
}
