import {getStyledText, getToneSuggestion} from './ApiRequest'

async function getResult({content, type, context}) {
    switch (type) {
        case 'style':
            return getStyledText(content, context);
        case 'tone':
            return getToneSuggestion(content, context);
        default:
            return 'invalid type';
    }
}

export default getResult