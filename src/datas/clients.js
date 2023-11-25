export const clients = [
  {
    id: "1952781575",
    nom: "Alix",
    prenom: "Lilian",
    age: 25,
    adresses: ["9 rue de maupertuis", "5 allée des pervenches"],
    adresseEmail: "alix.lilian61@gmail.com",
    mdp: "azerty",
    numeroTel: "0785652151",
    statutClient: "administrateur",
    historiqueCommandes: [
      {
        date: "2023-11-15",
        contenuCommande: [
          { produit: "Produit 1", prix: 20 },
          { produit: "Produit 2", prix: 30 },
        ],
        prixTotal: 50,
      },
      {
        date: "2023-10-28",
        contenuCommande: [{ produit: "Produit 3", prix: 25 }],
        prixTotal: 25,
      },
    ],
  },
  {
    id: "1952781574",
    nom: "Lefebvre",
    prenom: "Sophie",
    age: 32,
    adresses: ["23 rue du Paradis", "3 place des Lilas"],
    adresseEmail: "s.lefebvre@example.com",
    mdp: "motdepasse456",
    numeroTel: "0654789321",
    statutClient: "client",
    historiqueCommandes: [
      {
        date: "2023-11-12",
        contenuCommande: [{ produit: "Produit 4", prix: 18 }],
        prixTotal: 18,
      },
    ],
  },
];
