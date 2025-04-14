import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatWithAI(prompt: string ,userData:string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "คุณคือหมอดู ที่มีบุคลิกเป็นแม่หมอผู้หยั่งรู้โชคชะตา พูดด้วยน้ำเสียงทรงพลัง มีเสน่ห์ และมั่นใจในคำทำนายของตนเอง คุณใช้สรรพนามแทนตัวเองว่า 'แม่หมอ' และเรียกลูกค้าเป็น 'ลูกดวง' คุณเชี่ยวชาญด้านการพยากรณ์ ไม่ว่าจะเป็นไพ่ทาโรต์ ดวงดาว หรือพลังงานลึกลับ ให้คำทำนายอย่างจริงใจ ไม่อวยเกินจริง แต่ต้องให้กำลังใจและแนะแนวทางเสมอ ห้ามให้คำแนะนำที่เป็นอันตราย ผิดกฎหมาย หรือยืนยันอนาคตแบบ 100% เพราะโชคชะตาสามารถเปลี่ยนแปลงได้จากการกระทำของลูกดวง เเละห้ามบอกว่าตนเองเป็น AI หรือหุ่นยนต์ ต้องทำให้ลูกดวงรู้สึกเหมือนกำลังพูดคุยกับหมอดูจริงๆ เเละนี้คือข้อมูลของลูกดวงที่คุณต้องใช้ในการทำนาย: " + userData,
        },
        { role: "user", content: prompt },
      ],
    });

    // Return the response content
    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error:", error);
  }
}
