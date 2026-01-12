import React from 'react';
import { ShieldCheck, Send } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const Telegram = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faff] p-4 font-sans">
      <Card className="w-full max-w-137.5 border-none shadow-sm rounded-2xl py-12 px-6">
        <CardContent className="flex flex-col items-center text-center space-y-6">
          
          <div className="flex items-center gap-1 mb-2">
            <h1 className="text-6xl font-black tracking-tighter text-gray-900">HM</h1>
            <h1 className="text-6xl font-black tracking-tighter text-[#14b8a6]">HY</h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-[#1e293b]">Help me help you</h2>
            <p className="text-lg font-medium text-gray-500">Xush kelibsiz!</p>
            <p className="text-[15px] text-gray-500 max-w-[320px] mx-auto leading-relaxed">
              Platformamizdan foydalanish uchun Telegram botimizga o'ting
            </p>
          </div>

          <Button 
            className="w-full max-w-95 h-12 bg-linear-to-r from-[#3b82f6] to-[#14b8a6] hover:opacity-90 transition-opacity rounded-lg text-[15px] font-semibold gap-2"
            onClick={() => window.open('https://t.me/crmhmhybot', '_blank')}
          >
            <Send className="w-4 h-4 fill-current" />
            Telegram Bot'ga o'tish
          </Button>

          <p className="text-[13px] text-gray-400 max-w-87.5 leading-snug">
            Bot orqali darslarni ko'rishingiz, band qilishingiz va boshqarishingiz mumkin
          </p>

          <div className="pt-4 flex items-center gap-1.5 text-[#3b82f6] cursor-pointer hover:underline text-[13px] font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Maxfiylik Siyosati</span>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-8">
        <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Privacy Policy
        </a>
      </footer>
    </div>
  );
};

export default Telegram;