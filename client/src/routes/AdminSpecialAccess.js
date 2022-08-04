import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { useHistory, Redirect } from "react-router";
import useIsMounted from "react-is-mounted-hook";
import check from "../assets/check.svg";

import CreatePopup from "../components/new/popups/CreatePopup";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SvgIcon from "@mui/material/SvgIcon";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Fab from "@mui/material/Fab";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import MultipleSelect from "../components/new/MultipleSelect";
import NftCard from "../components/new/NftCard";
import NftCardSkeleton from "../components/new/NftCardSkeleton";

import useStore from "../util/Store";
import { getNFTs, finalizeNFTLicensing, downloadNFTData } from "../util/Api";
import {
  sendCurrencyToServer,
  getMetamaskAccount,
  ensureLogin,
  createNftFinalize,
} from "../util/Metamask";
import { downloadURI } from "../util/Func";

import SelectionGrid from "../components/new/SelectionGrid";

import { getOwner } from "../util/Metamask";
import {
  getETHPrice,
  createEvent,
  getEvents,
  deleteEvent as deleteItemEvent,
  updateNft,
} from "../util/Api";
import FileInput from "../components/new/FileInput";
import EventCard from "../components/new/EventCard";

const AdminSpecialAccess = () => {
  const [owner, setOwner] = useState(null);

  const getOwnerAddress = () => {
    getOwner()
      .then((re) => {
        setOwner(re);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    getOwnerAddress();
  });

  // return owner===null?(<div>Loading</div>)
  // :(<EditSpecialAccessPage owner={owner}/>)
  return <EditSpecialAccessPage owner={owner} />;
};

const EditSpecialAccessPage = ({ owner }) => {
  const isMounted = useIsMounted();
  const history = useHistory();
  const [user] = useStore("user");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showEvent, setShowEvent] = useState(false);
  const [date, setDates] = useState("");
  const [priceType, setPriceType] = useState("BNB");
  const [iconFile, setIconFile] = useState("");
  const [dataFile, setDataFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [category, setCategory] = useState(null);
  const [sendAcive, setSendAcive] = useState(false);
  const [events, setEvents] = useStore([]);
  const [nftsLoading, setNftsLoading] = useState(false);
  const [nameNFT, setNameNFT] = useState("");
  const [descriptionNFT, setDescriptionNFT] = useState("");
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [limit, setLimit] = useState(10);

  const [nfts, setNfts] = useState([]);
  const [editSelect, setEditSelect] = useState(false);

  const handleAddPage = () => {
    setPage(page + 1);
  };

  const handleRemovePage = () => {
    setPage(page - 1);
  };

  const handleChangeCategory = (e, newValue) => {
    setCategory(newValue);
  };

  const handleCloseError = () => {
    setError("");
  };

  const handleEditState = async (item) => {
    try {
      setError("");
      if (!user?.address) {
        throw new Error("You must have a connected wallet to do that");
      }
      if (!nameNFT) {
        throw new Error("Please include the NFT name");
      }
      if (!descriptionNFT) {
        throw new Error("Please include the NFT description");
      }
      //handle edit NFT
      let res = await updateNft({ name: nameNFT, description: descriptionNFT });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg || err.message);
    }
  };

  const handleDeleteEvent = async (itemId, _id) => {
    try {
      let delItem = await deleteItemEvent({ eventId: itemId, _id });
      console.log(itemId, _id);
      setSuccess(delItem.msg);
      setDeleteEvent(false);
      console.log(delItem);
    } catch (err) {
      setError(err.msg);
    }
  };

  const handleDelete = (itemId) => {
    setDeleteEvent(itemId);
  };

  const handleCloseSuccess = () => {
    setSuccess("");
  };
  const handleCreateEvent = async () => {
    try {
      let event = await createEvent({
        eventName: name,
        description,
        date,
        permissions: category.value,
        requirement: "required",
      });

      setSuccess(event.msg);
      setShowEvent(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCreateEvent = () => {
    try {
      setError("");
      if (!user?.address) {
        throw new Error("You must have a connected wallet to do that");
      }
      if (!category) {
        throw new Error("Please select the event category");
      }
      if (!name) {
        throw new Error("Please include the event name");
      }
      if (!description) {
        throw new Error("Please include the event description");
      }
      if (!date) {
        throw new Error("Please include the event date");
      }
      //handle create event
      handleCreateEvent();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg || err.message);
    }
  };

  const populateEvents = useCallback(async () => {
    try {
      let loadEvents = await getEvents();
      setEvents(loadEvents.events);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const defaultFilter = {
    sort: "Newest",
    priceRange: [0, 1000],
    price: "Any",
    category: "Any",
  };

  const populateNFTs = useCallback(
    async (search) => {
      try {
        const { sort, price, priceRange, category } = defaultFilter;
        setNftsLoading(true);
        const {
          nfts: { docs, totalDocs, limit },
        } = await getNFTs({ search, page, sort, price, priceRange, category });
        if (!isMounted()) return;
        setNfts(docs);
        setTotal(totalDocs);
        setLimit(limit);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.msg || err.message);
      } finally {
        if (!isMounted()) return;
        setNftsLoading(false);
      }
    },
    [page, isMounted]
  );

  useEffect(() => {
    populateEvents();
  }, [events, populateEvents]);

  useEffect(() => {
    populateNFTs();
  }, [populateNFTs]);
  //only owner can visit route
  // if(user?.address !== owner) return <Redirect to='/'/>

  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <Grid
          container
          sx={{
            mb: 4,
            backgroundColor: "#1C1C1C",
            padding: "15px 0px",
            borderRadius: "10px",
          }}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <Typography textAlign="center" color="text.secondary" variant="h6">
              Admin special access control
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {success !== "" && (
              <Alert
                sx={{ my: 1 }}
                severity="success"
                onClose={handleCloseSuccess}
              >
                {success}
              </Alert>
            )}
            <Grid
              container
              justifyContent="space-between"
              sx={{ mb: 1 }}
              spacing={2}
            >
              <Grid item>
                <Typography variant="h5">Current events</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Button
                    onClick={(e) => {
                      setShowEvent(!showEvent);
                    }}
                    variant="outlined"
                  >
                    Add new event
                  </Button>
                </Typography>
              </Grid>
            </Grid>

            {showEvent && (
              <div
                style={{
                  border: "1px solid lightGrey",
                  padding: "20px",
                  borderRadius: "20px",
                }}
              >
                {(error !== "" && error.includes('event')) &&(
                  <Alert severity="error" onClose={handleCloseError}>
                    {error}
                  </Alert>
                )}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, mb: 3 }}
                >
                  Choose a category for your event
                </Typography>
                <SelectionGrid
                  options={[
                    {
                      label: "Membership",
                      value: "membership",
                      color: "#4BC9F0",
                    },
                    { label: "Founder", value: "founder", color: "#45B26B" },
                    { label: "All", value: "all", color: "#45B26B" },
                  ]}
                  value={category}
                  onChange={handleChangeCategory}
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  textTransform="uppercase"
                  color="text.accent"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Event name
                </Typography>
                <TextField
                  placeholder="Member Pick Up Parties..."
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  textTransform="uppercase"
                  color="text.accent"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Description
                </Typography>
                <TextField
                  placeholder="About this event..."
                  fullWidth
                  multiline
                  minRows={3}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <Typography
                  variant="body2"
                  fontWeight={600}
                  textTransform="uppercase"
                  color="text.accent"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Date
                </Typography>
                <TextField
                  placeholder="Saturday, October 15th 3pm-8pm"
                  type={'date'}
                  value={date}
                  onChange={(e) => {
                    setDates(e.target.value);
                  }}
                  fullWidth
                />
                <Button
                  size="large"
                  onClick={handleClickCreateEvent}
                  sx={{ mt: 2 }}
                  endIcon={
                    <SvgIcon>
                      <use xlinkHref="#icon-arrow-next" />
                    </SvgIcon>
                  }
                >
                  Create new event
                </Button>
              </div>
            )}

            <Grid
              container
              justifyContent="space-between"
              sx={{ mb: 4 }}
              spacing={0}
            >
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {events &&
                  events.length !== 0 &&
                  events.map((item, i) => {
                    return (
                      <EventCard
                        icon={
                          <Grid item style={{ display: "flex" }}>
                            {deleteEvent === i ? (
                              <Typography
                                style={{ padding: "10px 10px" }}
                                color="error"
                                variant="body2"
                              >
                                Delete event ?
                              </Typography>
                            ) : null}

                            {deleteEvent === i && (
                              <Fab
                                onClick={(e) =>
                                  handleDeleteEvent(item.eventId, item._id)
                                }
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  marginBottom: "10px",
                                  backgroundColor: "#b7f7c8",
                                }}
                                size="small"
                                sx={{ mx: 1 }}
                                hand
                              >
                                <img
                                  alt="check"
                                  style={{ height: "15px", color: "green" }}
                                  src={check}
                                />
                              </Fab>
                            )}

                            <Fab
                              onClick={(e) => {
                                !deleteEvent && handleDelete(i);
                                deleteEvent && handleDelete(false);
                              }}
                              style={{
                                width: "36px",
                                height: "36px",
                                marginBottom: "10px",
                                backgroundColor: "#fcccca",
                              }}
                              size="small"
                              sx={{ color: "text.secondary" }}
                              hand
                            >
                              <SvgIcon>
                                <use
                                  color={"red"}
                                  xlinkHref={"#icon-close-circle"}
                                />
                              </SvgIcon>
                            </Fab>
                          </Grid>
                        }
                        item={item}
                        i={i}
                        loading={loading}
                      />
                    );
                  })}
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              sx={{ mt: 4 }}
              spacing={2}
            >
              <Grid item>
                <Typography variant="h5">Edit NFTs</Typography>
              </Grid>
            </Grid>

            <Container sx={{ mt: 6 }}>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                  <Typography variant="h5" fontWeight={500}>
                    Listings
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 4, mb: 5 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md lg>
                  {nftsLoading ? (
                    <Grid
                      container
                      spacing={4}
                      padding={4}
                      justifyContent="center"
                    >
                      <Grid item xs={12} sm={6} md={4}>
                        <NftCardSkeleton />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <NftCardSkeleton />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <NftCardSkeleton />
                      </Grid>
                    </Grid>
                  ) : (
                    <Fade in={!nftsLoading}>
                      <Grid
                        container
                        spacing={4}
                        padding={4}
                        justifyContent="center"
                      >
                        {nfts.map((item, index) => (
                          <Grid
                            item
                            key={`discover-item-${index}`}
                            xs={12}
                            sm={6}
                            md={4}
                          >
                            <NftCard
                              name={item.name}
                              sx={{
                                display: editSelect?.id === index ? "none" : "",
                              }}
                              description={item.description}
                              image={item.image}
                              stock={item.stock}
                              price={item.price}
                              priceType={item.priceType}
                              category={item.categories?.[0]}
                              isOwner={
                                user?.address
                                  ? item.owner.address.toLowerCase() ===
                                    user?.address?.toLowerCase()
                                  : false
                              }
                              editView={true}
                              status={item.status}
                              // onClick={() => handleClickNFT(item)}
                              // onClickDownload={() =>
                              //   // handleClickNFTDownload(item)
                              // }
                              // onClickPurchase={() =>
                              //   // handleClickNFTPendingPurchase(item)
                              // }

                              handleClickEdit={() =>
                                !editSelect &&
                                setEditSelect({ id: index, item })
                              }
                            />

                            {editSelect?.id === index && (
                              <div
                                style={{
                                  border: "1px solid lightGrey",
                                  padding: "10px",
                                  borderRadius: "20px",
                                }}
                              >
                                <Grid item>
                                  <Fab
                                    onClick={(e) => {
                                      setEditSelect(false);
                                    }}
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      marginBottom: "10px",
                                      backgroundColor: "#fcccca",
                                    }}
                                    size="small"
                                    sx={{ color: "text.secondary" }}
                                    hand
                                  >
                                    <SvgIcon>
                                      <use
                                        color={"red"}
                                        xlinkHref={"#icon-close-circle"}
                                      />
                                    </SvgIcon>
                                  </Fab>
                                </Grid>
                                {(error !== "" && !error.includes('event') ) && (
                                  <Alert
                                    sx={{ fontSize: "12px" }}
                                    severity="error"
                                    onClose={handleCloseError}
                                  >
                                    {error}
                                  </Alert>
                                )}

                                {(success !== "" && !success.includes('event')) && (
                                  <Alert
                                    sx={{ fontSize: "12px" }}
                                    severity="success"
                                    onClose={handleCloseSuccess}
                                  >
                                    {success}
                                  </Alert>
                                )}
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  textTransform="uppercase"
                                  color="text.accent"
                                  sx={{ mt: 3, mb: 2 }}
                                >
                                  Edit NFT name
                                </Typography>
                                <TextField
                                  placeholder={item.name}
                                  fullWidth
                                  value={nameNFT}
                                  onChange={(e) => setNameNFT(e.target.value)}
                                />
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  textTransform="uppercase"
                                  color="text.accent"
                                  sx={{ mt: 3, mb: 2 }}
                                >
                                  NFT Description
                                </Typography>
                                <TextField
                                  placeholder={item.description}
                                  fullWidth
                                  multiline
                                  minRows={3}
                                  value={descriptionNFT}
                                  onChange={(e) => {
                                    setDescriptionNFT(e.target.value);
                                  }}
                                />
                                <Button
                                  size="large"
                                  onClick={(e) => handleEditState(item)}
                                  sx={{ mt: 2 }}
                                >
                                  Edit
                                </Button>
                              </div>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Fade>
                  )}
                  {nfts.length === 0 && !nftsLoading && (
                    <Grid
                      container
                      spacing={4}
                      padding={4}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Typography variant="h6">
                          Whoops! Looks like there's no NFTs that match that
                          search
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          startIcon={
                            <SvgIcon>
                              <use xlinkHref="#icon-close-circle" />
                            </SvgIcon>
                          }
                          // onClick={handleResetFilter}
                        >
                          Reset Filter
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                  {nfts.length !== 0 && (
                    <Grid
                      container
                      spacing={4}
                      padding={4}
                      justifyContent="center"
                    >
                      <Grid item>
                        <Button
                          variant="outlined"
                          disabled={
                            nfts.length === 0 || page === 1 || nftsLoading
                          }
                          onClick={handleRemovePage}
                        >
                          Previous Page
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          disabled={
                            nfts.length === 0 ||
                            page === Math.ceil(total / limit) ||
                            nftsLoading
                          }
                          onClick={handleAddPage}
                        >
                          Next Page
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Container>

          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {showEvent ? (
              <EventCard
                item={{
                  eventName: name,
                  date,
                  permissions: category?.value,
                  description,
                  requirement: ["required"],
                }}
                i={1}
                loading={loading}
                view={true}
              />
            ) : (
              <NftCard
                image={iconFile || dataFile || null}
                name={name || undefined}
                description={description || undefined}
                price={Number("price") || 0}
                priceType={priceType}
                stock={1}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminSpecialAccess;
