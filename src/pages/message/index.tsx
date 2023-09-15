import { useState, useRef, KeyboardEvent } from 'react'

// material ui
import { Avatar, Box, Grid, Stack, Typography, TextField, ClickAwayListener, Popper } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

// third party
import EmojiPicker, { SkinTones } from 'emoji-picker-react';

// import project
import ChatDrawer from './ChatDrawer';
import MainCard from '../../components/MainCard';
import IconButton from '../../components/@extended/IconButton';

// assets
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SendOutlined,
  SmileOutlined
} from '@ant-design/icons';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: { theme: any, open: boolean }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter
      }),
      marginLeft: 0
    })
  })
);

const Message = () => {
  const theme = useTheme();
  const textInput = useRef(null);

  const [openChatDrawer, setOpenChatDrawer] = useState<boolean>(true);
  const [user, setUser] = useState<any>({});
  const [message, setMessage] = useState<string>("");
  const [anchorElEmoji, setAnchorElEmoji] = useState<any>(null);

  const emojiOpen = Boolean(anchorElEmoji);
  const emojiId = emojiOpen ? 'simple-popper' : undefined;

  const handleDrawerOpen = () => {
    setOpenChatDrawer((prevState) => !prevState);
  };

  const handleOnSend = () => {
    if (message.trim() === '') { }
    setMessage('');
  }

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  // handle emoji
  const onEmojiClick = (emojiObject: any) => {
    setMessage(message + emojiObject.emoji);
  };


  const handleCloseEmoji = () => {
    setAnchorElEmoji(null);
  };

  const handleOnEmojiButtonClick = (event: Event) => {
    setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ChatDrawer openChatDrawer={openChatDrawer} handleDrawerOpen={handleDrawerOpen} setUser={setUser} />
      <Main theme={theme} open={openChatDrawer}>
        <Grid container>
          <Grid item xs={12} >
            <MainCard
              content={false}
              sx={{
                bgcolor: 'grey.50',
                pt: 2,
                pl: 2,
                borderRadius: '0 4px 4px 0',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.shorter + 200
                })
              }}
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    pr: 2,
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          onClick={handleDrawerOpen}
                          color="secondary"
                          size="large"
                        >
                          {openChatDrawer ? (
                            <MenuFoldOutlined />
                          ) : (
                            <MenuUnfoldOutlined />
                          )}
                        </IconButton>
                        <Avatar
                        />
                        <Stack>
                          <Typography variant="subtitle1">
                            081234567890
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Active 2h ago
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      overflowX: 'hidden',
                      height: 'calc(100vh - 410px)',
                      minHeight: 420
                    }}
                  >
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    mt: 3,
                    bgcolor: theme.palette.background.paper,
                    borderTop: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Stack>
                    <TextField
                      inputRef={textInput}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Your Message..."
                      value={message}
                      onChange={(e) =>
                        setMessage(
                          e.target.value.length <= 1
                            ? e.target.value.trim()
                            : e.target.value
                        )
                      }
                      onKeyDown={handleEnter}
                      variant="standard"
                      sx={{
                        pr: 2,
                        '& .MuiInput-root:before': {
                          borderBottomColor: theme.palette.divider
                        }
                      }}
                    />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" sx={{ py: 2, ml: -1 }}>
                        <>
                          <IconButton
                            ref={anchorElEmoji}
                            aria-describedby={emojiId}
                            onClick={handleOnEmojiButtonClick}
                            sx={{ opacity: 0.5 }}
                            size="medium"
                            color="secondary"
                          >
                            <SmileOutlined />
                          </IconButton>
                          <Popper
                            id={emojiId}
                            open={emojiOpen}
                            anchorEl={anchorElEmoji}
                            disablePortal
                            popperOptions={{
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [-20, 125]
                                  }
                                }
                              ]
                            }}
                          >
                            <ClickAwayListener onClickAway={handleCloseEmoji}>
                              <MainCard elevation={8} content={false}>
                                <EmojiPicker
                                  onEmojiClick={onEmojiClick}
                                  defaultSkinTone={SkinTones.DARK}
                                  autoFocusSearch={false}
                                />
                              </MainCard>
                            </ClickAwayListener>
                          </Popper>
                        </>
                      </Stack>
                      <IconButton
                        color="primary"
                        onClick={handleOnSend}
                        size="large"
                        sx={{ mr: 1.5 }}
                      >
                        <SendOutlined />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Main>
    </Box>
  )
}

export default Message