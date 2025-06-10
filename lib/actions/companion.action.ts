'use server'

import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '../supabase'

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth()
  if (!author) throw new Error("Unauthorized")

  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select()

  if (error || !data) {
    console.error('Error creating companion:', error)
    throw new Error(error?.message || 'Failed to create companion')
  }

  return data[0];
}


export const getAllComaponions = async ({limit = 10, page = 1, topic, subject, }: GetAllCompanions)=> {
  const supabase = await createSupabaseClient();

  let query = supabase.from('companions').select();

  if(subject && topic){
    query = query.ilike('subject', `%${subject}%`)
    .or(`topic.ilike.%${topic}%`)
  }
  else if(subject){
    query = query.ilike('subject', `%${subject}%`)
  
  }
  else if(topic){
    query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
  }

  query = query.range((page - 1) * limit, page * limit - 1)
  const { data: companions, error } = await query;


    if(error || ! companions){
      console.error('Error fetching companions:', error);
      throw new Error(error?.message || 'Failed to fetch companions');
    }

    // console.log(companions);
    

    return companions;
}

export const getCompanion = async (id: string)=>{
  const supabase = await createSupabaseClient();
  const {data, error} = await supabase.from('companions')
  .select()
  .eq('id',id)

  if(error || !data){
    console.error('Error fetching companion:', error);
    throw new Error(error?.message || 'Failed to fetch companion');
  }
  
  return data[0];

}