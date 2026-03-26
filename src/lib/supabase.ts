import { createClient } from '@supabase/supabase-js';
import { begraafplaatsenGroningen, type Begraafplaats } from './fallback-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export async function getBegraafplaatsen(provincie: string): Promise<Begraafplaats[]> {
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return begraafplaatsenGroningen.filter(
      (b) => b.provincie.toLowerCase() === provincie.toLowerCase(),
    );
  }

  try {
    const { data, error } = await supabase
      .from('begraafplaatsen')
      .select('*')
      .ilike('provincie', provincie)
      .order('naam', { ascending: true });

    if (error) {
      console.error('Error fetching begraafplaatsen:', error);
      return begraafplaatsenGroningen.filter(
        (b) => b.provincie.toLowerCase() === provincie.toLowerCase(),
      );
    }

    return data && data.length > 0
      ? data
      : begraafplaatsenGroningen.filter(
          (b) => b.provincie.toLowerCase() === provincie.toLowerCase(),
        );
  } catch (error) {
    console.error('Exception fetching begraafplaatsen:', error);
    return begraafplaatsenGroningen.filter(
      (b) => b.provincie.toLowerCase() === provincie.toLowerCase(),
    );
  }
}

export async function getAllBegraafplaatsen(): Promise<Begraafplaats[]> {
  if (!supabase) {
    return begraafplaatsenGroningen;
  }

  try {
    const { data, error } = await supabase
      .from('begraafplaatsen')
      .select('*')
      .order('provincie', { ascending: true });

    if (error) {
      console.error('Error fetching all begraafplaatsen:', error);
      return begraafplaatsenGroningen;
    }

    return data && data.length > 0 ? data : begraafplaatsenGroningen;
  } catch (error) {
    console.error('Exception fetching all begraafplaatsen:', error);
    return begraafplaatsenGroningen;
  }
}

export { supabase };
