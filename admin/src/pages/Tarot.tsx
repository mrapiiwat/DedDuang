import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import {
  BASE_URL,
  CATEGORY,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  CATEGORY_TAROT_ID,
} from "../api/endpoint.api";

interface TarotItem {
  id: number;
  name: string;
  description: string;
  image: string;
  categoryId: string;
}

const Tarot: React.FC = () => {
  const [items, setItems] = useState<TarotItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TarotItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    categoryId: CATEGORY_TAROT_ID,
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}${CATEGORY}${CATEGORY_TAROT_ID}`);
      setItems(res.data.data.Items);
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message || "ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      description: "",
      image: "",
      categoryId: CATEGORY_TAROT_ID,
    });
    setSelectedItem(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (item: TarotItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      image: item.image,
      categoryId: item.categoryId,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      const res = await axios.delete(
        `${BASE_URL}${DELETE_ITEM}${selectedItem.id}`,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "ลบเรียบร้อย");
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message || "ไม่สามารถลบข้อมูลได้");
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && selectedItem) {
        const res = await axios.put(
          `${BASE_URL}${UPDATE_ITEM}${selectedItem.id}`,
          formData,
          {
            withCredentials: true,
          }
        );

        toast.success(res.data.message || "แก้ไขเรียบร้อย");
      } else {
        const res = await axios.post(`${BASE_URL}${CREATE_ITEM}`, formData, {
          withCredentials: true,
        });
        toast.success(res.data.message || "เพิ่มเรียบร้อย");
      }
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message || "ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#D2B589] font-prompt">
          ไพ่ทาโร่
        </h1>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-[#D2B589] text-white rounded hover:bg-[#a99371] transition duration-300 ease-in-out font-prompt"
        >
          + เพิ่มไพ่ทาโร่
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-[#D2B589] font-prompt animate-pulse text-lg">
          กำลังโหลดข้อมูล...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
              onClick={() => handleEdit(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg object-contain w-full h-48"
              />
              <h2 className="mt-2 font-semibold my-2 font-prompt text-lg text-center text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-400 truncate font-prompt text-sm text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4 p-4 bg-[#1A0040] text-white rounded-lg shadow-lg w-[90vw] max-w-md">
          <h2 className="text-xl font-bold text-center text-[#D2B589] font-prompt">
            {isEditing ? "แก้ไขไพ่ทาโร่" : "เพิ่มไพ่ทาโร่"}
          </h2>
          <input
            type="text"
            placeholder="ชื่อไพ่ทาโร่"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 rounded border text-black"
          />
          <input
            type="text"
            placeholder="ลิงก์รูปภาพ"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full px-3 py-2 rounded border text-black"
          />
          <textarea
            placeholder="คำอธิบาย"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 rounded border text-black"
          />
          <div className="flex justify-end gap-3 mt-4">
            {isEditing && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-prompt"
              >
                ลบ
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-prompt"
            >
              {isEditing ? "บันทึก" : "เพิ่ม"}
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500 font-prompt"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tarot;
