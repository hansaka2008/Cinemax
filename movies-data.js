// ===== බහුකාර්ය OMDb / TMDB Keys =====
export const OMDB_KEYS = ['7a316873', '51e44f67'];
export const TMDB_API_KEY = '9520064911c99afcedd16e505ced58cb'; // ඔබේ TMDB API Key එක

export const SUBDL_KEY = 'subdl_4M8I70ru8mbUim5eaHftWWlLvfSC5DUs64kioqp6igs';
export const OPENSUB_API_KEY = 'bqdHXy0PfXYKXVai3bIRDkANyZpeLtSG';
export const WYZIE_KEY = 'wyzie-py8u0ol1g1xb60pf3z1kiy3ylweuug1l'; 

// ===== HARDCODED EPISODES & MOVIES DATA =====
export const EPISODES_DATA = {
  'tt11198330': {
    '3': {
      '1': { 
        videoUrl: 'https://rapidseedbox85742-secure.swift-031.seedbox.vip/media/aa287beec019e30627cb772020be67a1/House.of.the.Dragon.S03E01.720p.HMAX.WEB-DL.DDP5.1.Atmos.H.264-Draken02.mkv',
        subtitleUrl: 'houseofthedragon.srt',
        name: 'Episode 1: Season 3 Premiere',
        whatsappDownloadUrl: 'https://wa.me/94775062608?text=.download%20House%20of%20the%20Dragon%20S03E01'
      }
    }
  }
};

export const CUSTOM_MOVIES_DATA = {
  'tt4633694': {
    videoUrl: 'https://iws.sinhalachr.workers.dev/?id=qo6UNotut4VUAye5RPnr5cHR&assetToken=qghBWpb9k6xuPzeFP1ZEGk1d&download=true',
    subtitleUrl: '', 
    name: 'Spider-Man: Into the Spider-Verse (2018)'
  }
};

export const HERO_SERIES = [
  {id:'tt0241527',title:'Harry Potter and the Sorcerer\'s Stone',year:'2001',rating:'7.6',plot:'An orphaned boy enrolls in a school of wizardry...'},
  {id:'tt11198330',title:'House of the Dragon',year:'2022',rating:'8.5',plot:'The story of the Targaryen civil war...'}
];

// ===== TMDB API එකෙන් CAST විස්තර ලබාගන්නා FUNCTION එක =====

/**
 * IMDb ID එකක් ලබාදී එම නිර්මාණයේ නළු නිළියන් 10 දෙනෙකුගේ විස්තර ලබාගනී.
 * @param {string} imdbId - උදා: 'tt11198330'
 * @param {string} type - 'movie' හෝ 'tv' (නොදුන්නොත් Auto-detect කරයි)
 */
export async function fetchCastByImdbId(imdbId, type = 'movie') {
  try {
    // 1. IMDb ID එක භාවිත කරලා TMDB ID එක සහ එය Movie ද TV Series ද කියා සොයාගැනීම
    const findUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`;
    const findResponse = await fetch(findUrl);
    const findData = await findResponse.json();

    let tmdbId = null;
    let mediaType = type;

    if (findData.movie_results && findData.movie_results.length > 0) {
      tmdbId = findData.movie_results[0].id;
      mediaType = 'movie';
    } else if (findData.tv_results && findData.tv_results.length > 0) {
      tmdbId = findData.tv_results[0].id;
      mediaType = 'tv';
    }

    if (!tmdbId) {
      console.warn(`TMDB ID එකක් සොයාගත නොහැකි විය: ${imdbId}`);
      return [];
    }

    // 2. ලබාගත් TMDB ID එකෙන් Credits (Cast) දත්ත ලබාගැනීම
    const creditsUrl = `https://api.themoviedb.org/3/${mediaType}/${tmdbId}/credits?api_key=${TMDB_API_KEY}`;
    const creditsResponse = await fetch(creditsUrl);
    const creditsData = await creditsResponse.json();

    // 3. පළමු නළුව නිළියන් 10 දෙනා වෙන් කර ගැනීම සහ Image URL සකස් කිරීම
    const topCast = creditsData.cast.slice(0, 10).map(actor => ({
      name: actor.name,
      character: actor.character,
      // පින්තූරය නැත්නම් Placeholder රූපයක් පෙන්වයි
      profileUrl: actor.profile_path 
        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
        : 'https://via.placeholder.com/185x278?text=No+Image'
    }));

    return topCast;

  } catch (error) {
    console.error("Cast දත්ත ලබාගැනීමේදී දෝෂයක් සිදු විය:", error);
    return [];
  }
}

// ===== UI එකට CAST DISPLAY කරන සරල ක්‍රමවේදය (FRONTEND EXAMPLE) =====/*
  භාවිතා කරන ආකාරය (ඔබේ Frontend Script එකක):
  
  import { fetchCastByImdbId } from './your_file.js';

  async function loadPageDetails(imdbId) {
     const castList = await fetchCastByImdbId(imdbId);
     const castContainer = document.getElementById('cast-container'); // HTML Div එක
     
     castContainer.innerHTML = ''; // පැරණි දත්ත මකන්න
     
     castList.forEach(actor => {
        castContainer.innerHTML += `
           <div class="cast-card" style="display: inline-block; margin: 10px; text-align: center;">
              <img src="${actor.profileUrl}" alt="${actor.name}" style="width: 100px; border-radius: 8px; display: block; margin-bottom: 5px;">
              <strong style="font-size: 12px; display: block;">${actor.name}</strong>
              <span style="font-size: 10px; color: gray; display: block;">${actor.character}</span>
           </div>
        `;
     });
  }
*/
