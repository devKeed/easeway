export interface Review {
 name: string;
 title: string;
 text: string;
 image: string;
 rating: number;
 boxColor: string;
}

export const colorClassMap: {
 [key: string]: { border: string; text: string };
} = {
 blue: { border:"border-blue-500", text:"text-blue-500" },
 green: { border:"border-green-500", text:"text-green-500" },
 purple: { border:"border-purple-500", text:"text-purple-500" },
 red: { border:"border-red-500", text:"text-red-500" },
 yellow: { border:"border-yellow-500", text:"text-yellow-500" },
 indigo: { border:"border-indigo-500", text:"text-indigo-500" },
};

export const reviews: Review[] = [
 {
 name:"Sarah Thompson",
 title:"Excellent Recovery Support",
 text:"After my sports injury, the physiotherapy team here helped me get back to full mobility. The personalized treatment plan was exactly what I needed. Highly professional service!",
 image:"/images/testimonial1.jpg",
 rating: 5,
 boxColor:"blue",
 },
 {
 name:"Michael Johnson",
 title:"Outstanding Care",
 text:"Professional and caring staff who really understand pain management. The manual therapy sessions have significantly improved my chronic back pain. Couldn't be happier!",
 image:"/images/testimonial2.jpg",
 rating: 5,
 boxColor:"green",
 },
 {
 name:"Emma Wilson",
 title:"Life-Changing Treatment",
 text:"The physiotherapy treatments here are amazing. After months of mobility issues, I can now move freely again. The staff are incredibly knowledgeable and supportive.",
 image:"/images/testimonial3.jpg",
 rating: 5,
 boxColor:"purple",
 },
];
