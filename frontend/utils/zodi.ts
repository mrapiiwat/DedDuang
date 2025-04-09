export const zodiacSign = (month: number, day: number): string => {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "กุมภ์";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return "มีน";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return "เมษ";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return "พฤษภ";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return "เมถุน";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return "กรกฎ";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return "สิงห์";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return "กันย์";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return "ตุลย์";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "พิจิก";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "ธนู";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "มังกร";
  return "";
};


export const mockData = {
    image:
      "https://s3-alpha-sig.figma.com/img/71dc/6721/d7f9d352f744382136cc99a06b45bd61?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QMewktjp6XoMt3W6Bbhgwuhb81fvAqbtsHRUCnsN2R7d6w~zDqbmgR4zyBQGOmpQ-C1m2BJx2l2N9~v0rNYhTXpd30el-aGyPFmSTQ1JZTtxRzbuq434uYGbj~E5IsburVFXujyBWA7R4CiMd0c-3C9zHkarpHkG1hxXnkqgAKfziaoxAPimLAbLsTezDhe3hYONTTgQYi1--JcdunNnwdIgT43S8oVLLdEdrEwVLZV8ADeE3ztplWufTD0YBxwM3XUmaDg0t6CZ~~gVsmCVgNk9buHvHWIep-10MDIAN-ud6ob9hgFi0PyVQe9d-wnb6MIx1Rl56UE~zM~iDGrYlw__",
    text: "ราศีเมถุนหรือราศีคนคู่เป็นดาวที่อยู่ใต้อิทธิพลของดาวพุธหรือเมอร์คิวรี (Mercury) ซึ่งเป็นเทพแห่งการสื่อสาร มีของวิเศษเป็นรองเท้าและหมวกมีปีก ซึ่งถือเป็นตัวแทนของอุปนิสัยที่รู้จักปรับตัวและยืดหยุ่น ผู้ที่อยู่ในราศีนี้จึงรู้จักวิธีรับมือกับสถานการณ์ทุกประเภท แม้บางทีจะดูเหมือนโชคชะตาเล่นตลกแต่คนกลุ่มนี้ก็ยังรู้จักปรับตัวให้เข้ากับสิ่งรอบข้าง หรือแม้กระทั่งปรับความคิดและหลักจริยธรรมให้สอดคล้องกับโลกที่เปลี่ยนแปลงได้ ส่วนลักษณะนิสัยในทางลบของราศีนี้คือ การเป็นคนร้อนรน ขี้กระวนกระวายใจ การจะทำความเข้าใจคนในราศีนี้ให้ถ่องแท้เป็นเรื่องยาก เพราะราศีนี้ประกอบด้วยสติปัญญาและความรอบรู้เป็นจุดเด่น และมีความสนุกสนานร่าเริงอย่างวัยหนุ่มสาวเป็นอุปนิสัยโดยธรรมชาติ เมอร์คิวรี นอกจากถือเป็นเทพแห่งการสื่อสารแล้ว ยังมาพร้อมกับคุณสมบัติด้านวิทยาศาสตร์ การค้าขาย เป็นนักคิด อยากรู้อยากเห็น และการเดินทางด้วย ในด้านหนึ่งคนในราศีนี้สามารถโกหกคนได้อย่างหน้าตาย แต่ในอีกด้านหนึ่งหากมีใครมาหลอกลวงก็สามารถรู้ได้ทะลุปรุโปร่งเช่นกัน",
  };