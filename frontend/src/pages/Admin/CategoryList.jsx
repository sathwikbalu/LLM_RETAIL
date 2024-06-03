import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../Components/CategoryForm";
import Modal from "../../Components/Modal";
import Cookies from "js-cookie";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = Cookies.get("jwt");
      const response = await axios.get(
        "http://localhost:5000/api/category/categories",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("Categories not found.");
      } else {
        toast.error("Fetching categories failed, try again.");
      }
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const token = Cookies.get("jwt");
      const response = await axios.post(
        "http://localhost:5000/api/category",
        { name },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setCategories([...categories, response.data]);
      setName("");
      toast.success(`${response.data.name} is created.`);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("Endpoint not found.");
      } else {
        toast.error("Creating category failed, try again.");
      }
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const token = Cookies.get("jwt");
      const response = await axios.put(
        `http://localhost:5000/api/category/${selectedCategory._id}`,
        { name: updatingName },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setCategories(
        categories.map((category) =>
          category._id === selectedCategory._id ? response.data : category
        )
      );
      toast.success(`${response.data.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("Category not found.");
      } else {
        toast.error("Updating category failed, try again.");
      }
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("jwt");
      await axios.delete(
        `http://localhost:5000/api/category/${selectedCategory._id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setCategories(
        categories.filter((category) => category._id !== selectedCategory._id)
      );
      toast.success(`${selectedCategory.name} is deleted.`);
      setSelectedCategory(null);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("Category not found.");
      } else {
        toast.error("Category deletion failed, try again.");
      }
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      {/* <AdminMenu /> */}
      <div className="md:w-3/4 p-3">
        <div className="h-12 text-white">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded-lg m-3 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
