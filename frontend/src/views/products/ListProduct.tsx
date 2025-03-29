"use client";
// MUI Imports
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import axios from "axios";

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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  category: string;
  registration_date: string;
  product_name: string;
  product_value: number;
}

const formatCurrency = (value: string): string => {
  const stringValue = String(value).replace(",", ".");

  const floatValue = parseFloat(stringValue);

  return floatValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

const Table = () => {
  const [products, setProducts] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function listProducts() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`
      );

      setProducts(response.data.products);
    }
    listProducts();
  }, []);

  const handleDelete = async () => {
    if (productToDelete !== null) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productToDelete}`
        );
        setProducts(
          products.filter((product) => product.id !== productToDelete)
        );
        setOpenDialog(false);
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  };

  const handleEdit = (productId: number) => {
    router.push(`/products/edit/${productId}`);
  };

  const openDeleteDialog = (productId: number) => {
    setProductToDelete(productId);
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
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data de cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="!plb-1">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          color="text.primary"
                          className="font-medium"
                        >
                          {product.product_name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="!plb-1">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          color="text.primary"
                          className="font-medium"
                        >
                          {formatCurrency(String(product.product_value))}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="!plb-1">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          color="text.primary"
                          className="font-medium"
                        >
                          {product.category}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="!plb-1">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          color="text.primary"
                          className="font-medium"
                        >
                          {product.registration_date}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td>
                    <IconButton
                      color="primary"
                      aria-label="edit"
                      onClick={() => handleEdit(product.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="remove"
                      onClick={() => openDeleteDialog(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>Nenhum produto encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir este produto? Esta ação não pode ser
          desfeita.
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
