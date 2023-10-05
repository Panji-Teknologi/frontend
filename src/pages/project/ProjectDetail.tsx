import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

// material ui
import {
  Grid,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  useMediaQuery,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";

// project import
import { getProjectDetail, handleByProject } from "../../store/actions/project";
import { useAppDispatch, useAppSelector } from "../../store";
import { ProjectDetail } from "../../types";

import MainCard from "../../components/MainCard";
import useCookie from "../../hooks/useCookie";
import ButtonBack from "../../components/@extended/ButtonBack";

// assets
import { AuditOutlined } from "@ant-design/icons";
import idrFormat from "../../utils/idrFormat";
import dayjs from "dayjs";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const ProjectDetail = () => {
  const theme = useTheme<any>();
  const { userId } = useParams();
  const [searchParasm] = useSearchParams();
  const contract = searchParasm.get('contract_id') as string
  const matchDownMD = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );
  const dispatch = useAppDispatch();
  const { projectDetail } = useAppSelector((state: any) => state.project);
  const [token] = useCookie("_auth");

  interface Item {
    associate_id: number;
    project_id: number;
    handle_by: number;
  }

  const ToggleableItem: React.FC<{ item: Item }> = ({ item }) => {
    const [associate_id] = useState<number>(item.associate_id);
    const [project_id] = useState<number>(item.project_id);
    const [handle_by, sethandle_by] = useState<number>(item.handle_by);
    const [loading, setLoading] = useState<string>();

    const handleToggle = () => {
      console.log(handle_by, "handle by");

      if (userId !== undefined && contract !== undefined) {
        dispatch(
          getProjectDetail({ token, tokenUserId: Number(userId), contract })
        );
      }
      setLoading("Loading...");

      const newValue = handle_by == 1 ? 2 : 1; // Toggle antara nilai 1 dan 2
      sethandle_by(newValue);

      dispatch(
        handleByProject({
          token,
          associate_id,
          project_id,
          handle_by: newValue,
        })
      );
      setLoading("Loading...");

      if (userId !== undefined && contract !== undefined) {
        dispatch(
          getProjectDetail({ token, tokenUserId: Number(userId), contract })
        );
      }
    };

    // useEffect(() => {
    //   sethandle_by(item.handle_by);
    // }, [item.handle_by]);

    return (
      <>
        {loading ? (
          loading
        ) : (
          <>
            {handle_by == 2 ? (
              <div>
                <Switch
                  {...label}
                  checked={false}
                  onChange={handleToggle}
                  color="primary"
                />
                Associate
              </div>
            ) : (
              <div>
                <Switch
                  {...label}
                  checked={true}
                  onChange={handleToggle}
                  color="primary"
                />
                Associate
              </div>
            )}
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    if (userId !== undefined && contract !== undefined) {
      dispatch(
        getProjectDetail({ token, tokenUserId: Number(userId), contract })
      );
    }
  }, [userId, contract]);

  return (
    <>
      <Stack mb={2} direction="row" justifyContent="space-between">
        <ButtonBack />
        <Typography variant="h5">Project Detail</Typography>
      </Stack>

      {projectDetail?.map((project: ProjectDetail, i: number) => {
        const currentDate = dayjs();
        const expirationDate = dayjs(project.expired_date);
        const diffInMonths = currentDate.diff(expirationDate, "month");
        let colorClass = "";

        if (diffInMonths === 0 || diffInMonths === 1) {
          colorClass = "red";
        } else if (diffInMonths === 2 || diffInMonths === 3) {
          colorClass = "orange";
        } else {
          colorClass = "green";
        }

        return (
          <MainCard key={i} sx={{ mb: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={5} md={4} xl={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MainCard
                      sx={{ maxHeight: 350, minHeight: 350, overflow: "auto" }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Stack spacing={2.5} alignItems="center">
                            <AuditOutlined
                              style={{ fontSize: 30, color: "#555" }}
                            />
                            <Stack spacing={0.5} alignItems="center">
                              <Typography
                                variant="h4"
                                color={theme.palette.secondary["600"]}
                              >
                                {project.contract_number}
                              </Typography>
                              <Typography variant="subtitle1" color="primary">
                                {idrFormat(project.total_price)}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <List
                            component="nav"
                            aria-label="main mailbox folders"
                            sx={{
                              py: 0,
                              "& .MuiListItem-root": { p: 0, py: 1 },
                            }}
                          >
                            <ListItem>
                              <ListItemIcon>Exp Date</ListItemIcon>
                              <ListItemSecondaryAction>
                                <Typography
                                  align="right"
                                  sx={{
                                    backgroundColor: colorClass,
                                    borderRadius: 1,
                                    px: 1,
                                    py: 0.5,
                                    color: "#fff",
                                  }}
                                >
                                  {dayjs(project.expired_date).format(
                                    "DD MMM YYYY"
                                  )}
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>Step</ListItemIcon>
                              <ListItemSecondaryAction>
                                <Typography align="right">
                                  {project.project_step_id === 1
                                    ? "Initial Audit"
                                    : project.project_step_id === 2
                                      ? "Surveillance 1"
                                      : project.project_step_id === 3
                                        ? "Surveillance 2"
                                        : project.project_step_id === 4
                                          ? "Surveillance 3"
                                          : project.project_step_id === 5
                                            ? "Surveillance 4"
                                            : project.project_step_id === 6
                                              ? "Surveillance 5"
                                              : null}
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>Handle By</ListItemIcon>
                              <ListItemSecondaryAction>
                                <ToggleableItem
                                  key={project.project_id}
                                  item={project}
                                />
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7} md={8} xl={9}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MainCard
                      title="Data Standards"
                      sx={{ maxHeight: 350, minHeight: 350, overflow: "auto" }}
                    >
                      <List sx={{ py: 0 }}>
                        {project.data_standard?.map((standard, i) => (
                          <ListItem key={i} divider={!matchDownMD}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">
                                    Type of Certification
                                  </Typography>
                                  <Typography>
                                    {standard.type_of_certification_number}
                                  </Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">
                                    Price
                                  </Typography>
                                  <Typography>
                                    {idrFormat(standard.price)}
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        ))}
                      </List>
                    </MainCard>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        );
      })}
    </>
  );
};

export default ProjectDetail;
