import React from 'react'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from '@/lib/utils'
import Link from 'next/link'

interface CompListsProps {
  title: string,
  companions: Companion[],
  classNames: string,
}

const CompLists = ({ title, companions, classNames}) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h1>Recently Completed Lessons</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-3 text-lg">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-right text-lg">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          {companions?.map(({id,subject, name, topic , duration}) => (
            <TableRow key={id}>
              <TableCell className="pr-10 font-medium flex">
                <Link href={`/companions/${id}`}>
                <div className='flex items-center gap-2'>
                    <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden' style={{backgroundColor: getSubjectColor(subject)}}>
                      <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35}/>

                    </div>
                    <div className="flex flex-col gap-2">
                      <p className='font-bold text-xl'>{name}</p>
                      <p className="text-md text-gray-600">Topic: {topic}</p>
                    </div>
                </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className='subject-badge w-fit max-md:hidden'>
                  {subject}
                </div>
                <div className='flex items-center justify-center rounded-lg w-fit p-2 md:hidden' style={{backgroundColor: getSubjectColor(subject)}}> 
                  <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18}/>
                </div>
              </TableCell>
              <TableCell className=" flex items-center justify-end">
                <p className='text-lg'>{duration}</p>
                <span className='max-md:hidden'>{" "}mins</span>
                <Image src="/icons/clock.svg" className='md:hidden block' width={14} height={14} alt='clock' />
              </TableCell>

              
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </article>
  )
}

export default CompLists
