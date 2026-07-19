// ===== බහුකාර්ය OMDb Keys =====
export const OMDB_KEYS = ['7a316873', '51e44f67'];

export const SUBDL_KEY = 'subdl_4M8I70ru8mbUim5eaHftWWlLvfSC5DUs64kioqp6igs';
export const OPENSUB_API_KEY = 'bqdHXy0PfXYKXVai3bIRDkANyZpeLtSG';
export const WYZIE_KEY = 'wyzie-py8u0ol1g1xb60pf3z1kiy3ylweuug1l'; 

// ===== TMDB API Integration =====
export const TMDB_API_KEY = '9520064911c99afcedd16e505ced58cb'; // අලුත් key eka
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w200';

// Get movie/TV details + cast using IMDb ID
export async function fetchTMDBByImdbId(imdbId) {
    try {
        const findRes = await fetch(`${TMDB_BASE_URL}/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`);
        const findData = await findRes.json();
        
        let mediaType = null, tmdbId = null, details = null;
        if (findData.movie_results.length > 0) {
            mediaType = 'movie';
            tmdbId = findData.movie_results[0].id;
        } else if (findData.tv_results.length > 0) {
            mediaType = 'tv';
            tmdbId = findData.tv_results[0].id;
        }
        
        if (!tmdbId) return null;
        
        const [detailsRes, creditsRes] = await Promise.all([
            fetch(`${TMDB_BASE_URL}/${mediaType}/${tmdbId}?api_key=${TMDB_API_KEY}`),
            fetch(`${TMDB_BASE_URL}/${mediaType}/${tmdbId}/credits?api_key=${TMDB_API_KEY}`)
        ]);
        
        details = await detailsRes.json();
        const credits = await creditsRes.json();
        
        return {
            title: details.title || details.name,
            year: (details.release_date || details.first_air_date || '').split('-')[0],
            rating: details.vote_average.toFixed(1),
            genres: details.genres.map(g => g.name).join(', '),
            overview: details.overview,
            poster: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : null,
            cast: credits.cast.slice(0, 12).map(actor => ({
                name: actor.name,
                character: actor.character,
                photo: actor.profile_path ? `${TMDB_IMG_URL}${actor.profile_path}` : 'https://via.placeholder.com/100x150?text=No+Image'
            })),
            tmdbId: tmdbId,
            mediaType: mediaType
        };
    } catch (e) {
        console.error('TMDB Fetch Error:', e);
        return null;
    }
}

// Generate OpenSubtitles search link
export function getSubtitleSearchUrl(imdbId) {
    const idNum = imdbId.replace('tt', '');
    return `https://www.opensubtitles.org/en/search/sublanguageid-all/imdbid-${idNum}`;
}

// Render cast HTML helper
export function renderCastHTML(castArray) {
    return castArray.map(actor => `
        <div class="cast-card">
            <img src="${actor.photo}" alt="${actor.name}" loading="lazy">
            <div class="cast-name">${actor.name}</div>
            <div class="cast-character">${actor.character}</div>
        </div>
    `).join('');
}
// ===== End TMDB Integration =====

// ===== HARDCODED EPISODES & MOVIES DATA (Download & Watch Links) =====
export const EPISODES_DATA = {
  'tt11198330': { // House of the Dragon IMDb ID
    '3': { // Season 3
      '1': { 
        videoUrl: 'https://rapidseedbox85742-secure.swift-031.seedbox.vip/media/aa287beec019e30627cb772020be67a1/House.of.the.Dragon.S03E01.720p.HMAX.WEB-DL.DDP5.1.Atmos.H.264-Draken02.mkv',
        subtitleUrl: 'houseofthedragon.srt',
        name: 'Episode 1: Season 3 Premiere',
        whatsappDownloadUrl: 'https://wa.me/94775062608?text=.download%20House%20of%20the%20Dragon%20S03E01%20-%20https%3A%2F%2Frapidseedbox85742-secure.swift-031.seedbox.vip/media/aa287beec019e30627cb772020be67a1/House.of.the.Dragon.S03E01.720p.HMAX.WEB-DL.DDP5.1.Atmos.H.264-Draken02.mkv'
      },
      '2': { 
        videoUrl: 'https://hub.airbender.buzz/1c962f145e53f144b539f7721c2139c4',
        subtitleUrl: 'houseofthedragon.srt', 
        name: 'Episode 2: The Red Dragon and the Gold',
        whatsappDownloadUrl: 'https://wa.me/94775062608?text=.download%20House%20of%20the%20Dragon%20S03E02%20-%20https%3A%2F%2Fhub.airbender.buzz%2F1c962f145e53f144b539f7721c2139c4'
      },
      '3': { 
        videoUrl: 'https://rapidseedbox85742-secure.swift-031.seedbox.vip/media/643f34718ec553520ea177a257ca3450/House.of.the.Dragon.S03E03.720p.AMZN.WEB-DL.DDP5.1.Atmos.H.264-MissionHexaPewPew.mkv',
        subtitleUrl: 'houseofthedragon.srt', 
        name: 'Episode 3: Season 3 Episode 3',
        whatsappDownloadUrl: 'https://wa.me/94775062608?text=.download%20House%20of%20the%20Dragon%20S03E03%20-%20https%3A%2F%2Frapidseedbox85742-secure.swift-031.seedbox.vip%2Fmedia%2F643f34718ec553520ea177a257ca3450/House.of.the.Dragon.S03E03.720p.AMZN.WEB-DL.DDP5.1.Atmos.H.264-MissionHexaPewPew.mkv'
      },
      '4': { 
        videoUrl: 'https://zeloru.com/adc_andr_ms/?cid=1783906170099900LK24024000131f5d4418c196c2223cf0faf4b6e41fI&zone=10553224-1560383409-4269441498&browser=Chrome&lang=en&country=LK&campaign=459671322',
        subtitleUrl: 'houseofthedragon.srt', 
        name: 'Episode 4: Season 3 Episode 4',
        whatsappDownloadUrl: 'https://wa.me/94775062608?text=.download%20House%20of%20the%20Dragon%20S03E04%20-%20https%3A%2F%2Frapidseedbox85742-files.swift-031.seedbox.vip%2Fapi%2Ffiles%2Fcat%3Fpath%3D%252FHouse.of.the.Dragon.S03E04.1080p.AMZN.WEB-DL.DDP5.1.Atmos.H.264-QAsH.mkv%26share%3DB1MerLu'
      }
    }
  }
};

// Hardcoded Movies + LIVE
export const CUSTOM_MOVIES_DATA = {
  'tt4633694': { // Spider-Man: Into the Spider-Verse IMDB ID
    videoUrl: 'https://iws.sinhalachr.workers.dev/?id=qo6UNotut4VUAye5RPnr5cHR&assetToken=qghBWpb9k6xuPzeFP1ZEGk1d&download=true',
    subtitleUrl: '', 
    name: 'Spider-Man: Into the Spider-Verse (2018)',
    whatsappDownloadUrl: 'https://wa.me/94775062608?text=.download%20Spider-Man%20Into%20the%20Spider-Verse%20-%20https%3A%2F%2Fiws.sinhalachr.workers.dev%2F%3Fid%3Dqo6UNotut4VUAye5RPnr5cHR%26assetToken%3DqghBWpb9k6xuPzeFP1ZEGk1d%26download%3Dtrue'
  },
  'tt28212876': { // Obsession IMDB ID
    videoUrl: 'https://hub.airbender.buzz/8eda6e05bd1c6668fcc135d48c06590d?token=1782922178139',
    subtitleUrl: 'obse.srt',
    name: 'Obsession (2026)',
    whatsappDownloadUrl: 'https://wa.me/94775062608?text=.download%20Obsession%20Film%20-%20https%3A%2F%2Fhub.airbender.buzz%2F8eda6e05bd1c6668fcc135d48c06590d%3Ftoken%3D1782922178139'
  },
  'tt0241527': { // Harry Potter 1
    videoUrl: 'https://drive.google.com/file/d/1D0xcgiaJ10hUGAorH0cdRoKb3rxNTd8o/preview',
    subtitleUrl: '', 
    name: 'Harry Potter and the Sorcerer\'s Stone (2001)',
    whatsappDownloadUrl: 'https://wa.me/94775062608?text=.gdrive%20https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1D0xcgiaJ10hUGAorH0cdRoKb3rxNTd8o%2Fpreview'
  },
  'tt0295297': { // Harry Potter 2
    videoUrl: 'https://drive.google.com/file/d/14_9Xp-giND8ERkt8Jxw02kM9WbhrSakB/preview',
    subtitleUrl: '', 
    name: 'Harry Potter and the Chamber of Secrets (2002)',
    whatsappDownloadUrl: 'https://wa.me/94775062608?text=.gdrive%20https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F14_9Xp-giND8ERkt8Jxw02kM9WbhrSakB%2Fpreview'
  },
  'tt0304141': { // Harry Potter 3
    videoUrl: 'https://drive.google.com/file/d/1f32MgHNhl5ajzO-5xcmtkUBVHfjRZry5/preview',
    subtitleUrl: '', 
    name: 'Harry Potter and the Prisoner of Azkaban (2004)',
    whatsappDownloadUrl: 'https://wa.me/94775062608?text=.gdrive%20https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1f32MgHNhl5ajzO-5xcmtkUBVHfjRZry5%2Fpreview'
  },

  // ===== අලුතෙන් එකතු කල FIFA WORLD CUP LIVE =====
  'fifa_live_2026': { 
    videoUrl: 'https://www.youtube.com/embed/OJlwIdoFz9A?autoplay=1&mute=1', // YouTube embed link
    subtitleUrl: '', 
    name: 'FIFA World Cup 2026 Live',
    whatsappDownloadUrl: 'https://wa.me/94775062608?text=.watch%20FIFA%20World%20Cup%20Live%20-%20https%3A%2F%2Fwww.youtube.com%2Flive%2FOJlwIdoFz9A'
  }
};

export const HERO_SERIES = [
  {id:'tt0241527',title:'Harry Potter and the Sorcerer\'s Stone',year:'2001',rating:'7.6',plot:'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.'},
  {id:'tt0295297',title:'Harry Potter and the Chamber of Secrets',year:'2002',rating:'7.4',plot:'An ancient prophecy seems to be coming true when a mysterious presence begins stalking the corridors of a school of magic.'},
  {id:'tt0304141',title:'Harry Potter and the Prisoner of Azkaban',year:'2004',rating:'7.9',plot:'Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner.'},
  {id:'tt4633694',title:'Spider-Man: Into the Spider-Verse',year:'2018',rating:'8.4',plot:'Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.'},
  {id:'tt28212876',title:'Obsession',year:'2026',rating:'8.0',plot:'A thrilling and emotional deep dive into love, mystery, and unpredictable human desire.'},
  {id:'tt11198330',title:'House of the Dragon',year:'2022',rating:'8.5',plot:'The story of the Targaryen civil war that took place about 200 years before the events of Game of Thrones.'},
  {id:'tt9813792',title:'From',year:'2022',rating:'7.8',plot:'Unravel the mystery of a city in middle U.S.A. that imprisons everyone who enters.'},
  {id:'tt13443470',title:'Wednesday',year:'2022',rating:'8.1',plot:'Follows Wednesday Addams years as a student at Nevermore Academy.'},
  {id:'tt10919420',title:'Squid Game',year:'2021',rating:'8.0',plot:'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games.'},
  {id:'tt4574334',title:'Stranger Things',year:'2016',rating:'8.7',plot:'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.'},
  {id:'tt0903747',title:'Breaking Bad',year:'2008',rating:'9.5',plot:'A chemistry teacher diagnosed with cancer turns to making meth to secure his family\'s future.'},

  // ===== අලුතෙන් එකතු කල FIFA WORLD CUP LIVE HERO =====
  {id:'fifa_live_2026',title:'FIFA World Cup 2026 Live',year:'2026',rating:'LIVE',plot:'Watch FIFA World Cup 2026 Live Streaming. Don\'t miss the biggest football event.'},
];

export const CATEGORIES = {
  trending: ['fifa_live_2026','tt0241527','tt0295297','tt0304141','tt4633694','tt28212876','tt11198330','tt9813792','tt13443470','tt10919420','tt4574334','tt0903747','tt8111088','tt3032476','tt0386676','tt0944947','tt0108778','tt2560140'],
  hollywood: ['tt0241527','tt0295297','tt0304141','tt4633694','tt28212876','tt0111161','tt1375666','tt0816692','tt0468569','tt0137523','tt0109830','tt0120737','tt0167260','tt4154796','tt7286456','tt15398776','tt9362722'],
  kdrama: ['tt15266542','tt14689414','tt13370348','tt11280740','tt10262630','tt13443470','tt11198330','tt1190634','tt10850932','tt11212276'],
  bollywood: ['tt8178634','tt15327088','tt12735488','tt1187043','tt12844910','tt10648342','tt0451850','tt0816442','tt0066763','tt0347304'],
  sinhala: ['tt2386490','tt0111161','tt1375666','tt0816692','tt0468569','tt0137523'],
  sports: ['fifa_live_2026'] // අලුත් category එකක්
};

export const LANG_MAP = {
  'en': {flag:'🇬🇧', name:'English'},
  'si': {flag:'🇱🇰', name:'Sinhala'},
  'ta': {flag:'🇱🇰', name:'Tamil'},
  'ko': {flag:'🇰🇷', name:'Korean'},
  'hi': {flag:'🇮🇳', name:'Hindi'},
  'fr': {flag:'🇫🇷', name:'French'},
  'de': {flag:'🇩🇪', name:'German'},
  'es': {flag:'🇪🇸', name:'Spanish'},
  'pt': {flag:'🇵🇹', name:'Portuguese'},
  'ar': {flag:'🇸🇦', name:'Arabic'},
  'zh': {flag:'🇨🇳', name:'Chinese'},
  'ja': {flag:'🇯🇵', name:'Japanese'},
  'tr': {flag:'🇹🇷', name:'Turkish'},
  'ru': {flag:'🇷🇺', name:'Russian'},
  'it': {flag:'🇮🇹', name:'Italian'},
  'nl': {flag:'🇳🇱', name:'Dutch'},
  'id': {flag:'🇮🇩', name:'Indonesian'},
  'th': {flag:'🇹🇭', name:'Thai'},
  'vi': {flag:'🇻🇳', name:'Vietnamese'},
  'pl': {flag:'🇵🇱', name:'Polish'},
};
