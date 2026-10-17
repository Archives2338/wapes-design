// Tipo del import de SVG para consumidores que no declaren vite/client.
declare module '*.svg' {
  const src: string;
  export default src;
}
