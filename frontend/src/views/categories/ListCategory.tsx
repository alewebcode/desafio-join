"use client";
// MUI Imports
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Styles Imports
import tableStyles from "@core/styles/table.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Category {
  id_categoria_planejamento: number;
  nome_categoria: string;
}

const Table = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function listCategories() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
      );

      setCategories(response.data.categories);
    }
    listCategories();
  }, []);

  const handleDelete = async () => {
    if (categoryToDelete !== null) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryToDelete}`
        );
        setCategories(
          categories.filter(
            (category) =>
              category.id_categoria_planejamento !== categoryToDelete
          )
        );

        setOpenDialog(false);
      } catch (error) {
        console.error("Erro ao deletar categoria:", error);
      }
    }
  };

  const handleEdit = (categoryId: number) => {
    router.push(`/categories/edit/${categoryId}`);
  };

  const openDeleteDialog = (productId: number) => {
    setCategoryToDelete(productId);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id_categoria_planejamento}>
                  <td className="!plb-1">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          color="text.primary"
                          className="font-medium"
                        >
                          {category.nome_categoria}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td>
                    <IconButton
                      color="primary"
                      aria-label="edit"
                      onClick={() =>
                        handleEdit(category.id_categoria_planejamento)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="remove"
                      onClick={() =>
                        openDeleteDialog(category.id_categoria_planejamento)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>Nenhuma categoria encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir esta categoria? Esta ação não pode
          ser desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Table;
