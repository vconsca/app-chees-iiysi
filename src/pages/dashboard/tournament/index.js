import { useCallback, useEffect, useMemo, useState } from 'react';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { playersApi } from 'src/api/players';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { PlayerListSearch } from 'src/sections/dashboard/player/player-list-search';
import { PlayerListTable } from 'src/sections/dashboard/player/player-list-table';

const usePlayersSearch = () => {
  const [state, setState] = useState({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'updatedAt',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback((sort) => {
    setState((prevState) => ({
      ...prevState,
      sortBy: sort.sortBy,
      sortDir: sort.sortDir,
    }));
  }, []);

  const handlePageChange = useCallback((event, page) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

const usePlayersStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    players: [],
    playersCount: 0,
  });

  const handlePlayersGet = useCallback(async () => {
    try {
      const response = await playersApi.getPlayers(searchState);

      if (isMounted()) {
        setState({
          players: response.data,
          playersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handlePlayersGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};

const usePlayersIds = (players = []) => {
  return useMemo(() => {
    return players.map((player) => player.id);
  }, [players]);
};

const Page = () => {
  const playersSearch = usePlayersSearch();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Player List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">Players</Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <PlayerListSearch
                onFiltersChange={playersSearch.handleFiltersChange}
                onSortChange={playersSearch.handleSortChange}
                sortBy={playersSearch.state.sortBy}
                sortDir={playersSearch.state.sortDir}
              />
              {/* <PlayerListTable
                
                onDeselectAll={playersSelection.handleDeselectAll}
                onDeselectOne={playersSelection.handleDeselectOne}
                onPageChange={playersSearch.handlePageChange}
                onRowsPerPageChange={playersSearch.handleRowsPerPageChange}
                onSelectAll={playersSelection.handleSelectAll}
                onSelectOne={playersSelection.handleSelectOne}
                page={playersSearch.state.page}
                rowsPerPage={playersSearch.state.rowsPerPage}
                selected={playersSelection.selected}
              /> */}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
