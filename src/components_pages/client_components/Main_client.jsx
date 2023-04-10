import React from 'react';
import '../../styles/main_client.scss';

export default function Main_client() {
  return (
    <main className="client_main">
      <nav>
        <ul>
          <li>VIEW ALL</li>
          <li>NEW ARRIVALS</li>
          <li>BEANIE</li>
          <li>HAT</li>
          <li>MUFFLER</li>
        </ul>
      </nav>
      <section className="product_display"></section>
    </main>
  );
}
