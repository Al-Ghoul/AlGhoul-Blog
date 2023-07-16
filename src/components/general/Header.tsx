import HeaderContainer from './HeaderContainer';
import { loadLocaleAsync } from '@/i18n/i18n-util.async'
import { i18nObject } from '@/i18n/i18n-util'

const Header = async ({ lang }: Props) => {
    await loadLocaleAsync(lang);
    const LL = i18nObject(lang);
    const headerLinks = [['tags', LL.TAGS_PAGE()],
    ['authors', LL.AUTHORS_PAGE()],
    ['topics', LL.TOPICS_PAGE()],
    ['about', LL.ABOUT_ME()]];

    return (
        <HeaderContainer lang={lang} headerLinks={headerLinks} />
    );
}

interface Props {
    lang: 'en' | 'ar',
}

export default Header;