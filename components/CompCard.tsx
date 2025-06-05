import Image from 'next/image';
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link';

interface CompCardProps {
    id: number;
    name: string;
    topic: string;
    subject: string;
    duration: string;
}

const CompCard = ({ id, name, topic, subject, duration, color }) => {
    return (
        <article className='companion-card' style={{ backgroundColor: color }}>
            <div className='flex justify-between items-center'>
                <div className='subject-badge'>{subject}</div>
                <button><Image src='/icons/bookmark.svg' alt='bookmark' width={30} height={30} className='companion-bookmark' /></button>
            </div>
            <h2 className='text-2xl font-bold'>{name}</h2>
            <p className='text-sm text-gray-800'>Topic: {topic}</p>
            <div className='flex gap-1'><Image src='/icons/clock.svg' width={14} height={14} alt='clock' /> {duration} mins duration</div>
            <Link href={`/companions/${id}`}>
                <Button variant="outline" className='btn-primary w-full justify-center bg-orange-500 text-white text-md border-0'>
                    Launch Lesson
                </Button>
            </Link>
        </article>
    )
}

export default CompCard
