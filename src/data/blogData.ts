export interface BlogPost {
 id: number;
 title: string;
 slug: string;
 content: { content: string }[];
 excerpt: string;
 featured_image: string;
 date: string;
 author: string;
}

export const blogPosts: BlogPost[] = [
 {
 id: 1,
 title:"Understanding Lower Back Pain: Causes and Treatment",
 slug:"understanding-lower-back-pain",
 content: [
 {
 content:
">Lower back pain is one of the most common complaints we see in physiotherapy...",
 },
 ],
 excerpt:
">Learn about the common causes of lower back pain and how physiotherapy can help you recover.",
 featured_image:"/images/blog1.jpg",
 date:"2024-01-15",
 author:"Dr. Sarah Mitchell",
 },
 {
 id: 2,
 title:"Sports Injury Prevention: Tips from Our Experts",
 slug:"sports-injury-prevention-tips",
 content: [
 {
 content:
">Preventing sports injuries is always better than treating them...",
 },
 ],
 excerpt:
">Discover essential tips from our physiotherapy experts to prevent common sports injuries.",
 featured_image:"/images/blog2.jpg",
 date:"2024-01-20",
 author:"Michael Thompson, Sports Physiotherapist",
 },
 {
 id: 3,
 title:"The Benefits of Manual Therapy for Chronic Pain",
 slug:"benefits-manual-therapy-chronic-pain",
 content: [
 {
 content:
">Manual therapy techniques have proven highly effective for chronic pain management...",
 },
 ],
 excerpt:
">Learn how manual therapy techniques can provide relief for chronic pain conditions.",
 featured_image:"/images/blog3.jpg",
 date:"2024-01-25",
 author:"Emma Wilson, Manual Therapy Specialist",
 },
];
