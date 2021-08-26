import {IReview} from './review.schema';

/**
 * Validates the HTML property of the Review Model.
 * @param html {string} - string that should only contain valid HTML
 * @returns Boolean
 */

interface pair {
  [key:string]: string,
}

export function validateHtml(this: IReview): boolean {
  const html: string = this.html;
  
  // map of openning and closing characters.
  const pairs: pair = {
    '}':'{',
    ']':'[',
    ')':'(',
    '>': '<'
  };

  const characters: string[] = [];
  const isStackEmpty = (s: string[]): boolean =>{
    return s.length === 0;
  }
  const peek = (s: string[]): string =>{
    return s[s.length-1];
  }

	for(let i = 0; i < html.length; ++i){
    // TODO: Can we make this stronger? No way of validating whether or not we have valid closing brackets.
		switch(html.charAt(i)){
			case '[': case '{':case '(':case '<':
				characters.push(html.charAt(i));
			break;
			case ']': case '}':case ')':case '>':
				if (isStackEmpty(characters) || peek(characters) !== pairs[html.charAt(i)]) return false;
				characters.pop();
			break;
			case '"':
				if(isStackEmpty(characters) || peek(characters) !== html.charAt(i)) {
					characters.push(html.charAt(i));
				} else {
					characters.pop();
				}
		}
	}

  const regex = new RegExp(/<\/?[a-z][\s\S]*>/i);
	return isStackEmpty(characters) && regex.test(html);
}
