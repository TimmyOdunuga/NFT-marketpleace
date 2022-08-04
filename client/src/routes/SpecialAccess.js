import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { useHistory, useParams } from "react-router";
import useIsMounted from "react-is-mounted-hook";
import { SwitchTransition } from "react-transition-group";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";
import SvgIcon from "@mui/material/SvgIcon";

import styled from "@mui/material/styles/styled";

import SelectionGrid from "../components/new/SelectionGrid";
import NftCard from "../components/new/NftCard";
import NftCardSkeleton from "../components/new/NftCardSkeleton";
import Skeleton from "@mui/material/Skeleton";

import {
  ensureLogin,
  getShortAddress,
  sendCurrencyToServer,
  getMetamaskAccount,
  isMetamaskConnected,
} from "../util/Metamask";
import {
  editUser,
  getUser,
  specialAccessRes,
  getNFTsByUserAddress,
  downloadNFTData,
  getEvents,
  reserveEvent,
} from "../util/Api";
import useStore from "../util/Store";
import { downloadURI } from "../util/Func";
import EventCard from "../components/new/EventCard";
import { Alert } from "@mui/material";

export const hasSpecialAccess = async (address) => {
  const hasNft = await (await getNFTsByUserAddress(address)).nfts;
  return hasNft;
};

const SpecialAccess = () => {
  const history = useHistory();
  const isMounted = useIsMounted();
  const [user, setUser] = useStore("user");
  const [params, setParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [nftsLoading, setNftsLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [profile, setProfile] = useState({});
  const [events, setEvents] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const handleClickNFT = (nft) => {
    history.push(`/item/${nft.nftId}`);
    window.scrollTo(0, 0);
  };

  const handleClickNFTPurchase = (nft) => {
    history.push(`/item/${nft.nftId}`);
    window.scrollTo(0, 0);
  };

  const handleCloseError = () => {
    setError("");
  };

  const handleCloseSuccess = () => {
    setSuccess("");
  };

  const handleReserveEvent = async (user, eventId, _id) => {
    try {
      console.log({user, eventId, _id});
      const { msg, response } = await reserveEvent({ eventId, user, _id });
      setSuccess(msg);
    } catch (err) {
      setError('Address already reserved')
      console.log(err);
    }
  };

  const handleClickNFTDownload = async (nft) => {
    try {
      setDownloadLoading(true);
      await ensureLogin();
      const { data } = await downloadNFTData(nft.nftId);
      if (!isMounted()) return;
      downloadURI(data, nft.name);
    } catch (err) {
      console.error(err);
    } finally {
      if (!isMounted()) return;
      setDownloadLoading(false);
    }
  };

  const populateUserNFTs = useCallback(async () => {
    try {
      setNftsLoading(true);
      const data = await getNFTsByUserAddress(params.address);
      console.log(data);
      if (!isMounted()) return;
      setNfts(data.nfts);
    } catch (err) {
      console.error(err);
    } finally {
      if (!isMounted()) return;
      setNftsLoading(false);
    }
  }, [isMounted, params.address]);

  const populateProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUser(params.address);
      if (!isMounted()) return;
      setProfile(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      if (!isMounted()) return;
      setLoading(false);
    }
  }, [isMounted, params.address]);

  const getUserAddress = async () => {
    const param = await getMetamaskAccount();
    console.log(param);
    setParam(param);
  };

  const populateEvents = useCallback(async () => {
    try {
      let loadEvents = await getEvents();
      setEvents(loadEvents.events);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    populateEvents();
    populateProfile();
  }, [populateProfile]);

  useEffect(() => {
    populateUserNFTs();
    getUserAddress();
  }, [populateUserNFTs]);

  return (
    <Box>
      <Container>
        <Grid
          container
          textAlign="center"
          direction="column"
          spacing={4}
          sx={{ mt: 2, mb: 10 }}
          jus
        >
          <Grid item>
            <Typography variant="h3">Welcome member</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1">
              Your subscription is valid until 12/31/2022
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid
          container
          direction="column"
          spacing={4}
          sx={{ mt: 2, mb: 10 }}
          jus
        >
          <Grid item>
            <Typography variant="h5">
              You have collected the following
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ minHeight: 700 }}>
              <SelectionGrid
                options={["All", "Founder", "Membership"]}
                onChange={(e, newVal) => setCategory(newVal)}
                value={category}
              />
              {nftsLoading ? (
                <Grid container spacing={2} sx={{ mt: 4 }}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <NftCardSkeleton />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <NftCardSkeleton />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <NftCardSkeleton />
                  </Grid>
                </Grid>
              ) : (
                <SwitchTransition>
                  {category === "All" ? (
                    <Fade key="profile-nfts-all" unmountOnExit>
                      <Grid container spacing={2} sx={{ mt: 3 }}>
                        {nfts.map((item, index) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            lg={4}
                            key={`profile-item-${index}`}
                          >
                            <NftCard
                              name={item.name}
                              description={item.description}
                              image={item.image}
                              stock={item.stock}
                              price={item.price}
                              priceType={item.priceType}
                              category={item.categories?.[0]}
                              owner={item.owner}
                              isOwner={
                                user?.address
                                  ? item.owner.address.toLowerCase() ===
                                    user?.address?.toLowerCase()
                                  : false
                              }
                              disabled={downloadLoading}
                              status={item.status}
                              onClick={() => handleClickNFT(item)}
                              onClickDownload={() =>
                                handleClickNFTDownload(item)
                              }
                              onClickPurchase={() =>
                                handleClickNFTPurchase(item)
                              }
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Fade>
                  ) : category === "Founder" ? (
                    <Fade key="profile-nfts-purchased" unmountOnExit>
                      <Grid container spacing={2} sx={{ mt: 4 }}>
                        {nfts
                          .filter((nft) => nft.categories[0] === "founder")
                          .map((item, index) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              lg={4}
                              key={`profile-item-${index}`}
                            >
                              <NftCard
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                stock={item.stock}
                                price={item.price}
                                priceType={item.priceType}
                                category={item.categories?.[0]}
                                owner={item.owner}
                                isOwner={
                                  user?.address
                                    ? item.owner.address.toLowerCase() ===
                                      user?.address?.toLowerCase()
                                    : false
                                }
                                status={item.status}
                                onClick={() => handleClickNFT(item)}
                                onClickDownload={() =>
                                  handleClickNFTDownload(item)
                                }
                                onClickPurchase={() =>
                                  handleClickNFTPurchase(item)
                                }
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </Fade>
                  ) : (
                    <Fade key="profile-nfts-sale" unmountOnExit>
                      <Grid container spacing={2} sx={{ mt: 4 }}>
                        {nfts
                          .filter((nft) => nft.categories[0] === "membership")
                          .map((item, index) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              lg={4}
                              key={`profile-item-${index}`}
                            >
                              <NftCard
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                stock={item.stock}
                                price={item.price}
                                priceType={item.priceType}
                                category={item.categories?.[0]}
                                owner={item.owner}
                                isOwner={
                                  user?.address
                                    ? item.owner.address.toLowerCase() ===
                                      user?.address?.toLowerCase()
                                    : false
                                }
                                status={item.status}
                                onClick={() => handleClickNFT(item)}
                                onClickDownload={() =>
                                  handleClickNFTDownload(item)
                                }
                                onClickPurchase={() =>
                                  handleClickNFTPurchase(item)
                                }
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </Fade>
                  )}
                </SwitchTransition>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid
          container
          direction="column"
          spacing={4}
          sx={{ mt: 2, mb: 10 }}
          jus
        >
          <Grid item>
            <Typography variant="h4">Upcoming events:</Typography>
          </Grid>

          <Grid item sx={{maxWidth:'1000px'}}>
          {success !== "" && (
                <Alert
                  sx={{ my: 1 }}
                  severity="success"
                  onClose={handleCloseSuccess}
                >
                  {success}
                </Alert>
              )}
            {error !== "" && (
              <Alert
                sx={{ my: 1 }}
                severity="success"
                onClose={handleCloseError}
              >
                {success}
              </Alert>
            )}
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {events &&
              events.length !== 0 &&
              events.map((item, i) => {
                return (
                  <EventCard
                    item={item}
                    i={i}
                    reserve={() =>handleReserveEvent(profile, item.eventId, item._id)}
                    loading={loading}
                  />
                );
              })}
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid
          container
          direction="column"
          spacing={4}
          sx={{ mt: 2, mb: 10 }}
          jus
        >
          <Grid item>
            <Typography variant="h4">
              Your current membership entitles you to:
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item>
              <a
                href="https://barrelriot.com/home/nft-level/ "
                style={{ textDecoration: "none" }}
              >
                <Button>Check here</Button>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SpecialAccess;
