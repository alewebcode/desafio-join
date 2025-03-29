"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Alert, CircularProgress, FormHelperText } from "@mui/material";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductFormProps {
  productId?: string;
}
interface Category {
  id_categoria_planejamento: number;
  nome_categoria: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    category_id: "",
    product_name: "",
    product_value: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSucessMessage] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputErrors, setInputErrors] = useState({
    category_id: false,
    product_name: false,
    product_value: false,
  });

  useEffect(() => {
    if (productId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`)
        .then((response) =>
          setFormData({
            category_id: response.data.category_id,
            product_name: response.data.product_name,
            product_value: formatCurrency(response.data.product_value),
          })
        );
    }

    async function listCategories() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
      );
      setCategories(response.data.categories);
    }
    listCategories();
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "product_value") {
      const formattedValue = formatCurrency(value);
      setFormData({
        ...formData,
        [name as string]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name as string]: value,
      });
    }

    setInputErrors({ ...inputErrors, [e.target.name]: false });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));

    setInputErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      category_id: !formData.category_id,
      product_name: !formData.product_name.trim(),
      product_value: !formData.product_value.trim(),
    };

    setInputErrors(errors);

    if (Object.values(errors).some((erro) => erro)) return;

    setLoading(true);

    const productData = {
      category_id: formData.category_id,
      product_name: formData.product_name,
      product_value: formData.product_value,
    };

    const formatValueProduct = productData.product_value
      .replace(/[^\d,]/g, "")
      .replace(",", ".");

    productData.product_value = formatValueProduct;

    if (productId) {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
          productData
        );

        if (response.status === 200) {
          setTimeout(() => {
            setLoading(false);

            setSucessMessage("Cadastro atualizado sucesso");
          }, 3000);
        }
      } catch (error) {
        setErrorMessage("Erro ao atualizar categoria");
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
          productData
        );

        if (response.status === 200) {
          setTimeout(() => {
            setLoading(false);

            setSucessMessage("Cadastro efetuado sucesso");
          }, 3000);
        }
      } catch (error) {
        setErrorMessage("Erro ao cadastrar produto");
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader title={productId ? "Editar Produto" : "Cadastrar Produto"} />
      <CardContent sx={{ paddingBottom: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} md={12}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Nome"
                placeholder=""
                value={formData.product_name}
                name="product_name"
                onChange={handleInputChange}
                error={inputErrors.product_name}
                helperText={
                  inputErrors.product_name ? "Informe o nome do produto." : ""
                }
                inputProps={{ maxLength: 150 }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Valor"
                placeholder=""
                value={formData.product_value}
                name="product_value"
                onChange={handleInputChange}
                error={inputErrors.product_value}
                helperText={
                  inputErrors.product_value ? "Informe o valor do produto." : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth error={inputErrors.category_id}>
                <InputLabel id="demo-basic-select-helper-label">
                  Categoria
                </InputLabel>
                <Select
                  label="Categoria"
                  defaultValue=""
                  id="demo-basic-select-helper"
                  labelId="demo-basic-select-helper-label"
                  value={formData.category_id}
                  name="category_id"
                  onChange={handleSelectChange}
                >
                  {categories.map((category) => (
                    <MenuItem
                      value={category.id_categoria_planejamento}
                      key={category.id_categoria_planejamento}
                    >
                      {category.nome_categoria}
                    </MenuItem>
                  ))}
                </Select>
                {inputErrors.category_id && (
                  <FormHelperText>
                    Informe a categoria do produto.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <div className="flex items-center justify-start flex-wrap gap-5">
                <Button
                  variant="outlined"
                  type="button"
                  onClick={() => router.push("/products")}
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

export default ProductForm;
