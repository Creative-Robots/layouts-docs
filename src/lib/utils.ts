
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