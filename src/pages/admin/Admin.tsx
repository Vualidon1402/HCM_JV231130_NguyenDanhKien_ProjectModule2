import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryAction } from "../../store/slices/category.slice";
import "./admin.scss";
import axios from "axios";

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

interface Product {
  id: any;
  name: string;
  image: string;
  type: string;
  price: number;
  price_before_discount: number;
  discount: number;
  description: string;
  sold: number;
  viewed: number;
  note: string;
}

interface CategoryStore {
  data: Product[];
}

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const categoryStore = useSelector(
    (store: { categoryStore: CategoryStore }) => store.categoryStore
  );
  const [editCategory, setEditCategory] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    price_before_discount: "",
    discount: "",
    description: "",
    sold: "",
    viewed: "",
    note: "",
  });
  console.log(categoryStore);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newAdd: Product = {
      id: generateId(),
      name: formData.get("name") as string,
      image: formData.get("image") as string,
      type: formData.get("type") as string,
      price: Number(formData.get("price") || 0),
      price_before_discount: Number(formData.get("price_before_discount") || 0),
      discount: Number(formData.get("discount") || 0),
      description: formData.get("description") as string,
      sold: Number(formData.get("sold") || 0),
      viewed: Number(formData.get("viewed") || 0),
      note: formData.get("note") as string,
    };

    try {
      await axios.post("http://localhost:3001/categories", newAdd);
      const categoryToAdd: Product = { ...newAdd, id: newAdd.id };
      dispatch(categoryAction.addCategory(categoryToAdd));
    } catch (error) {
      console.error("Error adding category:", error);
    }
    setFormValues({
      name: "",
      image: "",
      type: "",
      price: "",
      price_before_discount: "",
      discount: "",
      description: "",
      sold: "",
      viewed: "",
      note: "",
    });
  };
  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:3001/categories/${productId}`);
      dispatch(categoryAction.deleteCategory(productId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = async (productId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/categories/${productId}`
      );
      const category: Product = response.data;
      setEditCategory(category);
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa danh mục:", error);
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedCategory: Product = {
      id: editCategory?.id || generateId(),
      name: formData.get("name") as string,
      image: formData.get("image") as string,
      type: formData.get("type") as string,
      price: Number(formData.get("price") || 0),
      price_before_discount: Number(formData.get("price_before_discount") || 0),
      discount: Number(formData.get("discount") || 0),
      description: formData.get("description") as string,
      sold: Number(formData.get("sold") || 0),
      viewed: Number(formData.get("viewed") || 0),
      note: formData.get("note") as string,
    };

    try {
      if (editCategory) {
        const updatedCategoryWithId = {
          ...updatedCategory,
        };
        await axios.put(
          `http://localhost:3001/categories/${editCategory.id}`,
          updatedCategoryWithId
        );
        dispatch(categoryAction.updateCategory(updatedCategoryWithId));
        setEditCategory(null);
      } else {
        await axios.post("http://localhost:3001/categories", updatedCategory);
        const categoryToAdd: Product = {
          ...updatedCategory,
          id: String(updatedCategory.id),
        };
        dispatch(categoryAction.addCategory(categoryToAdd));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditCategory(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editCategory) {
      setEditCategory((prev) => {
        if (prev) {
          return { ...prev, [name]: value };
        }
        return null;
      });
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      <div className="Admin-category">
        <form
          style={{ display: "flex", flexDirection: "column", width: "500px" }}
          className="formAddCategory"
          onSubmit={(e) => {
            e.preventDefault();
            if (editCategory) {
              handleUpdate(e);
            } else {
              handleSubmit(e);
            }
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editCategory ? editCategory.name : formValues.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="image"
            value={editCategory ? editCategory.image : formValues.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="type"
            value={editCategory ? editCategory.type : formValues.type}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="price"
            value={editCategory ? editCategory.price : formValues.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price_before_discount"
            placeholder="price_before_discount"
            value={
              editCategory
                ? editCategory.price_before_discount
                : formValues.price_before_discount
            }
            onChange={handleChange}
          />
          <input
            type="text"
            name="discount"
            placeholder="discount"
            value={editCategory ? editCategory.discount : formValues.discount}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={
              editCategory ? editCategory.description : formValues.description
            }
            onChange={handleChange}
          />
          <input
            type="text"
            name="sold"
            placeholder="sold"
            value={editCategory ? editCategory.sold : formValues.sold}
            onChange={handleChange}
          />
          <input
            type="text"
            name="viewed"
            placeholder="viewed"
            value={editCategory ? editCategory.viewed : formValues.viewed}
            onChange={handleChange}
          />
          <input
            type="text"
            name="note"
            placeholder="note"
            value={editCategory ? editCategory.note : formValues.note}
            onChange={handleChange}
          />
          <button type="submit">{editCategory ? "Cập nhật" : "Thêm"}</button>
          {editCategory && (
            <button type="button" onClick={handleCancelEdit}>
              Hủy bỏ chỉnh sửa
            </button>
          )}
        </form>
        <div className="Admin-listProduct">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price Before Discount</th>
                <th>Price</th>
                <th>Viewed</th>
                <th>Sold</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryStore.data.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      style={{ width: 50 }}
                      src={product.image}
                      alt={product.name}
                    />
                  </td>
                  <td className="Admin-product-Name">{product.name}</td>
                  <td className="Admin-product-price">
                    {product.price_before_discount}
                  </td>
                  <td className="Admin-product-NewPrice">{product.price}</td>
                  <td className="Admin-product-View">{product.viewed}</td>
                  <td className="Admin-product-sold">{product.sold}</td>
                  <td className="Admin-product-action">
                    <button
                      onClick={() => {
                        handleEdit(product.id);
                      }}
                      className="Admin-product-action-EditBtn"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(product.id);
                      }}
                      className="Admin-product-action-Deletebtn"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
