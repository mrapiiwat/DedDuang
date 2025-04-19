import React, { useState, useEffect } from "react";
import {
  BASE_URL,
  GET_NEWS_ALL,
  CREATE_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
} from "../api/endpoint.api";
import axios from "axios";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
}

interface FormData {
  title: string;
  url: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    url: "",
    imageUrl: "",
  });

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}${GET_NEWS_ALL}`);
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}${CREATE_NEWS}`, formData, {
        withCredentials: true,
      });
      toast.success("เพิ่มข่าวเรียบร้อยแล้ว", { position: "bottom-right" });
      fetchData();
      setFormData({ title: "", url: "", imageUrl: "" });
      setIsAddModalOpen(false);
    } catch (error) {
      const errorMessage = (error as any).message || "เกิดข้อผิดพลาด";
      toast.error(errorMessage, { position: "bottom-right" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEditNews = async () => {
    if (!selectedNews) return;
    try {
      setIsLoading(true);
      await axios.put(`${BASE_URL}${UPDATE_NEWS}${selectedNews.id}`, formData, {
        withCredentials: true,
      });
      toast.success("อัปเดตข่าวเรียบร้อยแล้ว", { position: "bottom-right" });
      fetchData();
      setIsModalOpen(false);
      setIsEditing(false);
      setFormData({ title: "", url: "", imageUrl: "" });
    } catch (error) {
      const errorMessage = (error as any).message || "เกิดข้อผิดพลาด";
      toast.error(errorMessage, { position: "bottom-right" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedNews) return;
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}${DELETE_NEWS}${selectedNews.id}`, {
        withCredentials: true,
      });
      toast.success("ลบข่าวเรียบร้อยแล้ว", { position: "bottom-right" });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      const errorMessage = (error as any).message || "เกิดข้อผิดพลาด";
      toast.error(errorMessage, { position: "bottom-right" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (item: NewsItem) => {
    setSelectedNews(item);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (!selectedNews) return;
    setFormData({
      title: selectedNews.title,
      url: selectedNews.url,
      imageUrl: selectedNews.imageUrl,
    });
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#D2B589] font-prompt">
          ข่าวสารและกิจกรรม
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-[#D2B589] text-white rounded hover:bg-[#a99371] transition duration-300 ease-in-out font-prompt"
        >
          + เพิ่มข่าวใหม่
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {news.map((item) => (
            <div key={item.id}>
              <img
                onClick={() => handleImageClick(item)}
                className="object-cover w-full h-full rounded-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                src={item.imageUrl}
                alt={item.title}
              />
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <form
          onSubmit={handleSubmitAddNews}
          className="p-5 space-y-4 bg-[#1A0040] rounded-lg"
        >
          <h1 className="text-2xl text-center text-[#D2B589] font-prompt font-extrabold">
            เพิ่มข่าวใหม่
          </h1>
          <input
            type="text"
            placeholder="หัวข้อข่าว"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 rounded font-prompt text-xl"
            required
          />
          <input
            type="text"
            placeholder="ลิงก์รูปภาพ"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            className="w-full px-3 py-2 rounded font-prompt text-xl"
            required
          />
          <input
            type="text"
            placeholder="ลิงก์ข่าว"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full px-3 py-2 rounded font-prompt text-xl"
            required
          />
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#D2B589] text-white rounded hover:bg-[#a99371] transition duration-300 ease-in-out"
            >
              {isLoading ? "กำลังเพิ่ม..." : "เพิ่มข่าว"}
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
      >
        <div className="space-y-4 p-4 bg-[#1A0040] text-white rounded-lg shadow-lg w-[90vw] max-w-md">
          {isEditing ? (
            <>
              <h2 className="text-xl font-bold text-center text-[#D2B589]">
                แก้ไขข่าว
              </h2>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded border text-black"
                placeholder="หัวข้อข่าว"
              />
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="w-full px-3 py-2 rounded border text-black"
                placeholder="ลิงก์รูปภาพ"
              />
              <input
                type="text"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="w-full px-3 py-2 rounded border text-black"
                placeholder="ลิงก์ข่าว"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleSubmitEditNews}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  บันทึกการแก้ไข
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setFormData({ title: "", url: "", imageUrl: "" });
                  }}
                  className="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500"
                >
                  ยกเลิก
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-[#D2B589]">
                คุณต้องการทำอะไรกับข่าวนี้?
              </h2>
              <p className="text-gray-300 truncate">{selectedNews?.title}</p>
              {selectedNews?.url && (
                <a
                  href={selectedNews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline block mt-2"
                >
                  ดูข่าวต้นฉบับ
                </a>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  แก้ไข
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ลบ
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500"
                >
                  ยกเลิก
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Home;
