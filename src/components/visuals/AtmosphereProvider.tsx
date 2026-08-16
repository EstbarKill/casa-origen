
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Atmosphere = 'morning' | 'sunset' | 'night';

interface AtmosphereContextType {
  atmosphere: Atmosphere;
}

const AtmosphereContext = createContext<AtmosphereContextType>({ atmosphere: 'morning' });

export const useAtmosphere = () => useContext(AtmosphereContext);

export function AtmosphereProvider({ children }: { children: React.ReactNode }) {
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('morning');

  useEffect(() => {
    const updateAtmosphere = () => {
      //const hour = new Date().getHours();
      //if (hour >= 6 && hour < 17) setAtmosphere('morning');
      //else if (hour >= 17 && hour < 19) setAtmosphere('sunset');
      //else setAtmosphere('night');
      setAtmosphere('morning');
    };
    
    updateAtmosphere();
    const interval = setInterval(updateAtmosphere, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-atmosphere', atmosphere);
  }, [atmosphere]);

  return (
    <AtmosphereContext.Provider value={{ atmosphere }}>
      <div className={`atmosphere-root ${atmosphere}`}>
        {children}
      </div>
    </AtmosphereContext.Provider>
  );
}
