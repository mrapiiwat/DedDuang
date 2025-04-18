import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

interface SeemseeItem {
  id: number;
  name: string;
  description: string;
  image: string;
  categoryId: string;
}

const Seemsee: React.FC = () => {
  const [items, setItems] = useState<SeemseeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SeemseeItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    categoryId: "957ebdfc-97fd-4d2d-89ff-edff1f4fdb1e", // 🎯 เซียมซี
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/category/957ebdfc-97fd-4d2d-89ff-edff1f4fdb1e"
      );
      setItems(res.data.data.Items);
    } catch (err) {
      toast.error("โหลดข้อมูลไม่สำเร็จ");
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
      categoryId: "957ebdfc-97fd-4d2d-89ff-edff1f4fdb1e",
    });
    setSelectedItem(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (item: SeemseeItem) => {
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
      await axios.delete(
        `http://localhost:5000/api/seemsee/${selectedItem.id}`
      );
      toast.success("ลบสำเร็จ");
      fetchData();
      setIsModalOpen(false);
    } catch {
      toast.error("ลบไม่สำเร็จ");
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && selectedItem) {
        await axios.put(
          `http://localhost:5000/api/seemsee/${selectedItem.id}`,
          formData
        );
        toast.success("อัปเดตเรียบร้อย");
      } else {
        await axios.post("http://localhost:5000/api/seemsee", formData);
        toast.success("เพิ่มข้อมูลเรียบร้อย");
      }
      fetchData();
      setIsModalOpen(false);
    } catch {
      toast.error("บันทึกไม่สำเร็จ");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#D2B589] font-prompt">
          เซียมซี
        </h1>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-[#D2B589] text-white rounded hover:bg-[#a99371] transition duration-300 ease-in-out font-prompt"
        >
          + เพิ่มเซียมซี
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
            {isEditing ? "แก้ไขเซียมซี" : "เพิ่มเซียมซี"}
          </h2>
          <input
            type="text"
            placeholder="ชื่อเซียมซี"
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

export default Seemsee;
