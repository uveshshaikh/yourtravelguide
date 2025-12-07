import dynamic from 'next/dynamic';
import type { NearbyMapProps } from './NearbyMap.client';

const ClientLeafletMap = dynamic(() => import('./NearbyMap.client').then(mod => mod.default), {
  ssr: false,
});

export default function NearbyMap(props: NearbyMapProps) {
  return <ClientLeafletMap {...props} />;
}
