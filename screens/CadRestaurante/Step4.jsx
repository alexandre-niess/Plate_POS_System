import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Step4 = ({ formData, setFormData }) => {
  const [category, setCategory] = useState("");

  const handleAddCategory = () => {
    if (category.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        categorias: [...prevData.categorias, category],
      }));
      setCategory("");
    }
  };

  const handleDeleteCategory = (index) => {
    setFormData((prevData) => {
      const newCategorias = [...prevData.categorias];
      newCategorias.splice(index, 1);
      return { ...prevData, categorias: newCategorias };
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newCategorias = Array.from(formData.categorias);
    const [movedCategory] = newCategorias.splice(result.source.index, 1);
    newCategorias.splice(result.destination.index, 0, movedCategory);
    setFormData((prevData) => ({ ...prevData, categorias: newCategorias }));
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}
      >
        Cadastro de Categorias
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
              {formData.categorias.map((categoria, index) => (
                <React.Fragment key={categoria}>
                  <Draggable draggableId={categoria} index={index}>
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
                  {index < formData.categorias.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default Step4;
