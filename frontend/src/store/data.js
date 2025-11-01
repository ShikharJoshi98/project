import { FaHandHoldingHeart } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicinePills, GiThreeLeaves } from "react-icons/gi";

export const clinicImages = [
    '/image-2.jpeg',
    '/image-3.jpeg',
    '/image-4.jpeg',
    '/image-5.jpeg',
    '/image-8 (1).jpeg',
    '/image-8 (3).jpeg'
]

export const iconMap = {
    FaUserDoctor: FaUserDoctor,
  GiThreeLeaves: GiThreeLeaves,
  GiMedicinePills: GiMedicinePills,
  FaHandHoldingHeart: FaHandHoldingHeart,
  };

export const aboutCards = [
    {
      title: "Our Philosophy",
      desc: "We heal the whole person—mind, body, and spirit—using natural remedies for lasting balance and wellness.",
      color: "bg-green-500",
      icon: "GiThreeLeaves",
      bg: "bg-[#E4FEEF]",
    },
    {
      title: "Gentle Healing",
      desc: "We provide personalized, gentle, and effective treatments tailored to your needs.",
      color: "bg-yellow-400",
      icon: "FaUserDoctor",
      bg: "bg-[#fffae5]",
    },
    {
      title: "Expert Care",
      desc: "Our experienced homeopathic doctors provide expert care and personalized prescriptions for lasting health.",
      color: "bg-pink-400",
      icon: "GiMedicinePills",
      bg: "bg-[#f6edec]",
    },
    {
      title: "Patient Wellbeing",
      desc: "We’re dedicated to your wellness, supporting your health journey with care, trust, and comfort.",
      color: "bg-purple-400",
      icon: "FaHandHoldingHeart",
      bg: "bg-[#F3F0FF]",
    },
  ];