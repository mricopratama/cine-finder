import { Movie, Genre } from '../types/movie';

export const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

export const popularMovies: Movie[] = [
  {
    id: 1,
    title: 'Dune: Part Two',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
    poster_path: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500',
    backdrop_path: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260',
    release_date: '2024-02-29',
    vote_average: 8.4,
    vote_count: 5420,
    genre_ids: [878, 12, 18],
    runtime: 166,
    tagline: 'Long live the fighters.',
    credits: {
      cast: [
        { id: 1, name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 2, name: 'Zendaya', character: 'Chani', profile_path: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 3, name: 'Rebecca Ferguson', character: 'Lady Jessica', profile_path: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ]
    }
  },
  {
    id: 2,
    title: 'Oppenheimer',
    overview: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    poster_path: 'https://images.pexels.com/photos/8191606/pexels-photo-8191606.jpeg?auto=compress&cs=tinysrgb&w=500',
    backdrop_path: 'https://images.pexels.com/photos/8191606/pexels-photo-8191606.jpeg?auto=compress&cs=tinysrgb&w=1260',
    release_date: '2023-07-21',
    vote_average: 8.1,
    vote_count: 7850,
    genre_ids: [18, 36],
    runtime: 180,
    tagline: 'The world forever changes.',
    credits: {
      cast: [
        { id: 4, name: 'Cillian Murphy', character: 'J. Robert Oppenheimer', profile_path: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 5, name: 'Emily Blunt', character: 'Katherine Oppenheimer', profile_path: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 6, name: 'Robert Downey Jr.', character: 'Lewis Strauss', profile_path: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ]
    }
  },
  {
    id: 3,
    title: 'Spider-Man: Across the Spider-Verse',
    overview: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting existence itself.',
    poster_path: 'https://images.pexels.com/photos/7991227/pexels-photo-7991227.jpeg?auto=compress&cs=tinysrgb&w=500',
    backdrop_path: 'https://images.pexels.com/photos/7991227/pexels-photo-7991227.jpeg?auto=compress&cs=tinysrgb&w=1260',
    release_date: '2023-06-02',
    vote_average: 8.6,
    vote_count: 6200,
    genre_ids: [16, 28, 12],
    runtime: 140,
    tagline: 'It\'s how you wear the mask that matters.',
    credits: {
      cast: [
        { id: 7, name: 'Shameik Moore', character: 'Miles Morales', profile_path: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 8, name: 'Hailee Steinfeld', character: 'Gwen Stacy', profile_path: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ]
    }
  },
  {
    id: 4,
    title: 'The Batman',
    overview: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    poster_path: 'https://images.pexels.com/photos/8159657/pexels-photo-8159657.jpeg?auto=compress&cs=tinysrgb&w=500',
    backdrop_path: 'https://images.pexels.com/photos/8159657/pexels-photo-8159657.jpeg?auto=compress&cs=tinysrgb&w=1260',
    release_date: '2022-03-04',
    vote_average: 7.8,
    vote_count: 9500,
    genre_ids: [28, 80, 18],
    runtime: 176,
    tagline: 'Unmask the truth.',
    credits: {
      cast: [
        { id: 9, name: 'Robert Pattinson', character: 'Bruce Wayne / Batman', profile_path: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 10, name: 'Zoë Kravitz', character: 'Selina Kyle', profile_path: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ]
    }
  },
  {
    id: 5,
    title: 'Avatar: The Way of Water',
    overview: 'Set more than a decade after the events of the first film, learn the story of the Sully family, the trouble that follows them, and the lengths they go to keep each other safe.',
    poster_path: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=500',
    backdrop_path: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=1260',
    release_date: '2022-12-16',
    vote_average: 7.6,
    vote_count: 8900,
    genre_ids: [878, 12, 28],
    runtime: 192,
    tagline: 'Return to Pandora.',
    credits: {
      cast: [
        { id: 11, name: 'Sam Worthington', character: 'Jake Sully', profile_path: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 12, name: 'Zoe Saldana', character: 'Neytiri', profile_path: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ]
    }
  },
  {
    id: 6,
    title: 'Top Gun: Maverick',
    overview: 'After more than thirty years of service as one of the Navy\'s top aviators, Pete "Maverick" Mitchell is where he belongs, pushing the envelope as a courageous test pilot.',
    poster_path: 'https://images.pexels.com/photos/8159659/pexels-photo-8159659.jpeg?auto=compress&cs=tinysrgb&w=500',
    backdrop_path: 'https://images.pexels.com/photos/8159659/pexels-photo-8159659.jpeg?auto=compress&cs=tinysrgb&w=1260',
    release_date: '2022-05-27',
    vote_average: 8.3,
    vote_count: 7200,
    genre_ids: [28, 18],
    runtime: 131,
    tagline: 'Feel the need... The need for speed.',
    credits: {
      cast: [
        { id: 13, name: 'Tom Cruise', character: 'Pete "Maverick" Mitchell', profile_path: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 14, name: 'Miles Teller', character: 'Lt. Bradley "Rooster" Bradshaw', profile_path: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ]
    }
  }
];