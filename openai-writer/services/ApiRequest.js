import {Configuration, OpenAIApi} from "openai";

/**
 * 
 * @param {*} promptValue 
 * @returns the response from gpt model
 */

export const openAIChatWrapper = async(promptValue) => {
    const configuration = new Configuration({apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY});
    const openai = new OpenAIApi(configuration)
    const createCompletion = await openai.createChatCompletion({model:process.env.NEXT_PUBLIC_OPENAI_API_MODEL, messages:[ { role: "user", content: promptValue }],});


    return createCompletion.data.choices[0].message.content;
};

/**
 * 
 * @param {*} content 
 * @param {*} context 
 * @returns the response with text styled according to the context chosen
 */

export const getStyledText= async(content, context) => {
    let promptValue="Below content is part of a writing article"
    switch (context) {
        case 'summarize' :
            promptValue += `Summarize the below content. \n "${content}"`
            break;
        case 'vocab':
            promptValue += `Provide some good vocabulary suggestions for the below content as a list of words with their mapping from existing worlds in the article. \n "${content}"`
            break;
        case 'improve':
            promptValue += `Improve the below content by making it even better. \n "${content}"`
            break;
        default:
            return content
    }

    const styledContent = openAIChatWrapper(promptValue)
    return styledContent
}

/**
 * 
 * @param {*} content 
 * @param {*} context 
 * @returns the response with tone selected
 */

export const getToneSuggestion=async(content, context) => {
    const tonePrompt=`paraphrase below text in "${context}" tone. \n "${content}"`
    const toneContent = openAIChatWrapper(tonePrompt)

    return toneContent
}