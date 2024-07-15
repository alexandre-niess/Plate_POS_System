import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import { usePratos } from "../src/PratoContext";
import {
  Button,
  Menu,
  MenuItem,
  FormControl,
  FilledInput,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Filter from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";

const headCells = [
  { id: "nome", numeric: false, disablePadding: true, label: "Nome" },
  {
    id: "descricao",
    numeric: false,
    disablePadding: false,
    label: "Descrição",
  },
  {
    id: "alergenicos",
    numeric: false,
    disablePadding: false,
    label: "Alérgenos",
  },
  { id: "preco", numeric: true, disablePadding: false, label: "Preço" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={headCell.id === "nome" ? { pl: 2 } : null} // Add padding-left to the first column
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Ações</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const { searchTerm, setSearchTerm, selectedFilter, setSelectedFilter } =
    props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (filter) => {
    setSelectedFilter(filter);
    handleClose();
  };

  const getPlaceholder = () => {
    switch (selectedFilter) {
      case "Nome":
        return "Pesquisar pelo Nome";
      case "Descrição":
        return "Pesquisar pela Descrição";
      case "Alérgenos":
        return "Pesquisar pelos Alérgenos";
      case "Preço":
        return "Pesquisar pelo Preço";
      default:
        return "Pesquisar";
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "40px",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Produtos
          </Typography>
          <Link to="/cad-prato" style={{ textDecoration: "none" }}>
            <Button variant="contained">Adicionar produto</Button>
          </Link>
        </Box>
        <FormControl sx={{ width: "30%" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-search">
            {getPlaceholder()}
          </InputLabel>
          <FilledInput
            id="filled-adornment-search"
            type="text"
            value={searchTerm}
            onChange={handleChangeSearch}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="filter options"
                  onClick={searchTerm ? handleClearSearch : handleClick}
                  edge="end"
                >
                  {searchTerm ? (
                    <ClearIcon sx={{ zIndex: "200" }} />
                  ) : (
                    <Filter sx={{ zIndex: "200" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <MenuItem onClick={() => handleMenuItemClick("Nome")}>Nome</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Descrição")}>
            Descrição
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Alérgenos")}>
            Alérgenos
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Preço")}>
            Preço
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
};

export function TabelaProdutos() {
  const { pratos, loading } = usePratos();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nome");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("Nome");
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (id) => {
    navigate(`/AppRestaurante/edit-prato/${id}`);
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pratos.length) : 0;

  const visibleRows = React.useMemo(() => {
    const filteredRows = pratos.filter((row) => {
      switch (selectedFilter) {
        case "Nome":
          return row.nome.toLowerCase().includes(searchTerm.toLowerCase());
        case "Descrição":
          return row.descricao.toLowerCase().includes(searchTerm.toLowerCase());
        case "Alérgenos":
          return row.alergenicos
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "Preço":
          return row.preco.toString().includes(searchTerm);
        default:
          return true;
      }
    });
    return stableSort(filteredRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, searchTerm, selectedFilter, pratos]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={pratos.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.id} // Use the ID of the row
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    component="th"
                    id={`enhanced-table-checkbox-${index}`}
                    scope="row"
                    padding="none"
                    sx={{ pl: 2 }} // Add padding-left to the first cell
                  >
                    {row.nome}
                  </TableCell>
                  <TableCell align="left">{row.descricao}</TableCell>
                  <TableCell align="left">{row.alergenicos}</TableCell>
                  <TableCell align="right">{row.preco}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleEditClick(row.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pratos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
          labelRowsPerPage="Linhas por página" // Translate "rows per page" to "Linhas por página"
        />
      </Paper>
    </Box>
  );
}
