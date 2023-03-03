import { atom } from 'jotai'

export const countAtom = atom(0)

export const countryAtom = atom('Japan')

export const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])

type Anime = {
  title: string
  year: number
  watched: boolean
}

export const animeAtom = atom<Anime[]>([
  {
    title: 'Ghost in the Shell',
    year: 1995,
    watched: true,
  },
  {
    title: 'Serial Experiments Lain',
    year: 1998,
    watched: false,
  },
])

export const progressAtom = atom((get) => {
  const anime = get(animeAtom)
  return anime.filter((item) => item.watched).length / anime.length
})
