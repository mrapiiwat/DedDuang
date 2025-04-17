import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
}

const Home: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/news?page=1&limit=30"
      );
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/news", {
        title: title,
        url: linkUrl,
        imageUrl: imageUrl,
      });
      toast.success("เพิ่มข่าวเรียบร้อยแล้ว", {
        position: "bottom-right",
      });
      setTitle("");
      setImageUrl("");
      setLinkUrl("");
      fetchData();
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="p-5 space-y-4 bg-[#1A0040] rounded-lg mb-8 "
      >
        <h1 className="text-2xl text-center text-[#D2B589] font-prompt font-extrabold">
          ADD NEWS!
        </h1>
        <div>
          <input
            type="text"
            placeholder="หัวข้อข่าว"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2  rounded font-prompt text-xl"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="ลิงก์รูปภาพ"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2  rounded font-prompt text-xl"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="ลิงก์ข่าว"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full px-3 py-2  rounded font-prompt text-xl"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 font-prompt py-2 bg-[#D2B589] text-white rounded hover:bg-[#a99371] transition duration-300 ease-in-out"
        >
          เพิ่มข่าว
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {news.map((item) => (
          <div key={item.id}>
            <a
              className="hover:cursor-pointer"
              href={item.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="object-cover w-full h-full rounded-lg"
                src={item.imageUrl}
                alt={item.title}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
