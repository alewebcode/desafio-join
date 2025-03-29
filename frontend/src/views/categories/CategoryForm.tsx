"use client";
import axios from "axios";
// React Imports
import { useEffect, useState } from "react";

// MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import React from "react";
import { useRouter } from "next/navigation";

interface CategoryFormProps {
  categoryId?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryId }) => {
  const router = useRouter();

  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSucessMessage] = useState<string>("");
  const [inputErrors, setInputErrors] = useState<boolean>(false);

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`)
        .then((response) => setCategoryName(response.data.nome_categoria));
    }
  }, [categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
    setInputErrors(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setInputErrors(true);
      return;
    }

    setLoading(true);

    if (categoryId) {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
          {
            name: categoryName,
          }
        );

        if (response.status === 200) {
          setTimeout(() => {
            setLoading(false);

            setSucessMessage("Cadastro atualizado sucesso");
          }, 3000);
        }
      } catch (error) {
        setErrorMessage("Erro ao atualizar categoria");
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
          {
            name: categoryName,
          }
        );

        if (response.status === 200) {
          setTimeout(() => {
            setLoading(false);
            setCategoryName("");

            setSucessMessage("Cadastro efetuado sucesso");
          }, 3000);
        }
      } catch (error) {
        setErrorMessage("Erro ao cadastrar categoria");
      }
    }
  };

  return (
    <Card>
      <CardHeader
        title={categoryId ? "Editar Categoria" : "Cadastrar Categoria"}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} md={12}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Categoria"
                name="categoryName"
                placeholder=""
                value={categoryName}
                onChange={handleChange}
                error={inputErrors}
                helperText={inputErrors ? "Este campo é obrigatório." : ""}
                inputProps={{ maxLength: 150 }}
              />
            </Grid>

            <Grid item xs={12}>
              <div className="flex items-center justify-start flex-wrap gap-5">
                <Button
                  variant="outlined"
                  type="button"
                  onClick={() => router.push("/categories")}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : null
                  }
                >
                  Salvar
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12} spacing={2}>
          {successMessage ? (
            <Alert severity="success" icon={false} sx={{ marginTop: 2 }}>
              {successMessage}
            </Alert>
          ) : errorMessage ? (
            <Alert severity="error" icon={false} sx={{ marginTop: 2 }}>
              {errorMessage}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
