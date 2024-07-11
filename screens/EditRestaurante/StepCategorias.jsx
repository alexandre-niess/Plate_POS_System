import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useContext } from "react";
import { RestaurantContext } from "../../src/RestaurantContext";

const StepCategorias = () => {
  const { restaurant, setRestaurant, loading } = useContext(RestaurantContext);
  const [category, setCategory] = useState("");

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleAddCategory = () => {
    if (category.trim()) {
      setRestaurant((prev) => ({
        ...prev,
        categorias: [...prev.categorias, category.trim()],
      }));
      setCategory("");
    }
  };

  const handleDeleteCategory = (index) => {
    setRestaurant((prev) => ({
      ...prev,
      categorias: prev.categorias.filter((_, i) => i !== index),
    }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedCategorias = Array.from(restaurant.categorias);
    const [movedItem] = updatedCategorias.splice(result.source.index, 1);
    updatedCategorias.splice(result.destination.index, 0, movedItem);
    setRestaurant((prev) => ({
      ...prev,
      categorias: updatedCategorias,
    }));
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}
      >
        Edição de Categorias
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Nova Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categorias">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {restaurant.categorias.map((categoria, index) => (
                <Draggable
                  key={categoria}
                  draggableId={categoria}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteCategory(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={categoria} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default StepCategorias;
