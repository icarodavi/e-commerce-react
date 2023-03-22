export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export function SlugToTitle(slug: string) {
    const words = slug.split('-');

    for (var i = 0; i < words.length; i++) {
        let word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(' ');
}