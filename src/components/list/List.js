import {Lightning} from "wpe-lightning-sdk";
import Item from "../item";

const GAP = 2;
const transitionDurationSec = 0.5;

export default class List extends Lightning.Component {
    static _template() {
        return {
            Items: {
                y: 120, forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Focus: {
                /**
                 * @ todo: Your goal is to add a focus indicator. Please take a look at the video
                 * and inspect the rectanle frame that's before the focused movie item.
                 * extra: Animate it a bit when the focus changes to the next item
                 */
                alpha: 0,
                scale: 1.2,
                pivot: 0.5,
                y: 120,
                x: -20, //<dlimbu/> comeback check alignment to its parent ..
                //<dlimbu/> rounded border
                Top: {rect: true, y: 3, colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4, w: Item.width + GAP, h: 5},
                Left: {rect: true, y: 3, color: 0xff8ecea2, w: 5, h: Item.height + GAP},
                Bottom: {rect: true, colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4, y: Item.height + 3 + GAP, w: Item.width + GAP + 5, h: 5},
                Right: {rect: true, y: 3, x: Item.width + GAP, color: 0xff03b3e4, w: 5, h: Item.height + 5 + GAP },
            },
            Metadata: {
                /**
                 * @todo: Your goal is to add a component that have multiple text labels,
                 * 1 for the Title of the selected asset and 1 for the genre.
                 */
                y: -30,
                x: -30, //<dlimbu/>dlimbu comeback check alignment to its parent ..
                Title: {
                    text: {
                        fontFace: 'SourceSansPro-Bold',
                        fontSize: 50,
                        wordWrap: false,
                        wordWrapWidth: 1500,
                        textOverflow: 'ellipsis'
                     }
                },
                Genre: {
                    y: 60,
                    colorLeft: 0xff8ecea2, 
                    colorRight: 0xff03b3e4,
                    text: { 
                        fontFace: 'SourceSansPro-Bold',
                        fontSize: 30,
                    }
                }
            }
        }
    }

    _init() {
        this._index = 0;
    }

    _handleLeft(){
        this.setIndex(Math.max(0, --this._index));
    }

    _handleRight(){
        this.setIndex(Math.min(++this._index, this.items.length - 1));
    }

    /**
     * @todo:
     * Implement working setIndex method
     * that stores index and position movie component to focus
     * on selected item
     */
    setIndex(idx){
        // store new index
        this._index = idx;

        // update position
        this.tag("Items").setSmooth("x",  idx * -220 );
    }

    onItemFocus(item) {
        this.label = item;
        this.tag("Focus").setSmooth("alpha", 1, {duration: transitionDurationSec});
        this.tag('Metadata').setSmooth('y', 10, {duration: transitionDurationSec});
    }

    onItemOffFocus() {
        this.tag("Focus").setSmooth("alpha", 0, {duration: transitionDurationSec});
        this.tag('Metadata').patch({
            y: -30,
            Metadata: {
                Title: {
                    text: {
                        text: ''
                    }
                },
                Genre: {
                    text: {
                        text: ''
                    }
                }
            }
        });
    }

    set label(v) {
        const { _title } = v;
        this.patch({
            Metadata: {
                Title: {
                    text: {
                        text: _title
                    }
                },
                Genre: {
                    text: {
                        text: 'Action | Thriller'
                    }
                }
            }
        })
    }

    _focus() {
        this.tag("Focus").setSmooth("alpha", 1, {duration: transitionDurationSec});
        this.tag('Metadata').setSmooth('y', 10, {duration: transitionDurationSec});
        this.label = this.items[this._index]._item;
    }

    _unfocus() {
        this.tag("Focus").setSmooth("alpha", 0, {duration: 0});
        this.tag('Metadata').setSmooth('y', 30, {duration: transitionDurationSec});
    }

    set data(v) {
        this.tag("Items").children = v.map((asset, index)=>{
            return {
                type: Item,
                item: asset,
                x: index * (Item.width + Item.offset),
                signals: { onItemFocus: true, onItemOffFocus: true, }
            };
        });
    }

    get items() {
        return this.tag("Items").children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _getFocused() {
        return this.activeItem;
    }
}
