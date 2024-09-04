import React from "react";

export function scrollToElement(event: React.MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault(); // Empêche le comportement par défaut du lien
  
    const target = event.currentTarget as HTMLAnchorElement;
    const targetId = target.getAttribute("href")?.substring(1);
    
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 120;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
  
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  }

export function capitalizeFirstLetter(str: string) {
  if (!str) return str; // Return the input if it's empty or not a string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getTextFromChildren = (children: React.ReactNode): string => {
  // Initialiser une variable pour stocker le texte
  let text = '';

  // Fonction récursive pour parcourir les enfants
  const extractText = (child: React.ReactNode) => {
    if (typeof child === 'string' || typeof child === 'number') {
      // Si l'enfant est une chaîne ou un nombre, l'ajouter au texte
      text += child;
    } else if (React.isValidElement(child) && child.props.children) {
      // Si l'enfant est un élément React valide avec des enfants, appeler récursivement
      React.Children.forEach(child.props.children, extractText);
    }
  };

  // Commencer l'extraction du texte à partir des enfants
  React.Children.forEach(children, extractText);

  return text;
};

export const DISCORD_URL = 'https://discord.com/invite/ysmacWJSzK';