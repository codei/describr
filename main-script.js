//Credit: https://github.com/behnammodi/polyfill/blob/master/math.polyfill.js
Math.sign || (Math.sign = function ( x ) {
    return ( (x > 0 ) - ( x < 0 ) ) || + x;
});

//Credit: https://stackoverflow.com/questions/31533963/polyfill-for-push-method-in-javascript
Array.push || (Array.prototype.push = function() {
    for ( var i = 0; i < arguments.length; i++ ) {
        this[this.length] = arguments[i];
    }

    return this.length;
});

//Credit: https://stackoverflow.com/questions/4775722/how-can-i-check-if-an-object-is-an-array
Array.isArray || (Array.isArray = function( arr ) {
    return Object.prototype.toString.call( arr ) === '[object Array]';
});

//Credit: https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
Object.isObject || (Object.isObject = function( obj ) {
    return Object.prototype.toString.call( obj ) === '[object Object]' && null !== obj;
});

Object.hasOwnProperty || (Object.prototype.hasOwnProperty = function( prop ) {
    return 'undefined' !== typeof this[ prop ];
});

Object.hasOwn || (Object.hasOwn = function( obj, prop ) {
    //Use Object.prototype's hasOwnProperty method here just in case in obj has its own "hasOwnProperty" method, a direct method.
    return Object.prototype.hasOwnProperty.call( obj, prop );
});

String.trim || (String.prototype.trim = function() {
    return String( this ).replace( /^\s+|\s+$/,'' );
});

//Credit: https://learnersbucket.com/examples/interview/polyfill-for-array-foreach/
Array.forEach || (Array.prototype.forEach = function ( callback, context ) {
    for ( var  i = 0; i < this.length; i++ ) {
        // This is primarily to check if the item exists in the array. 
        if ( this.indexOf( this[i] ) > -1) {
            callback.call( context, this[i], i, this );
        }
    }
});

//Credit: https://medium.com/nerd-for-tech/polyfill-for-array-map-filter-and-reduce-e3e637e0d73b
Array.map || (Array.prototype.map = function( callbackFn ) {
    var arr = [], 
        p   = this, 
        len = p.length, 
        i   = 0;  

    for ( ; i < len; i++ ) { 
        /* call the callback function for every value of this array and push the returned value into our resulting array*/
        arr[ i ] = callbackFn( p[ i ], i, p );
    }

    return arr;
});

//Array.includes polyfill
Array.includes || (Array.prototype.includes = function( e ) {
    if ( ! e ) return false;

    var i = 0;

    while( i < this.length ) {
        if ( e == this[i++] ) return true;
    }

    return false;
});

//Capitalizes first letter of a string.
String.prototype.capitalize = function() {
    return this.substring( 0, 1 ).toUpperCase() + this.slice(1);
};

(function( $, win ) {
    /**
     * Parses JSON data into JavaScript object.
     * 
     * @param JSON obj JSON data to parse
     * @return JavaScript object, parameter otherwise.
     */
    win.isJson = function( obj ) {
        try {
            JSON.parse( obj );
        } catch ( e ) {
            return obj;
        }

        return JSON.parse( obj );
    };
    
    win.describr || ( win.describr = {} );
        var sanitizeTxt = function ( faultyTxt ) {
                faultyTxt = 'undefined' === typeof faultyTxt ? '' : faultyTxt;

                var div = document.createElement('div'), txt;

                div.innerHTML = String( faultyTxt );
 
                txt =  div.textContent || div.innerText || '';

                return txt.trim();
            },
            //Similar to WordPress' map_deep()
            sanitize = function ( dirty ) {
                if ( Object.isObject( dirty ) ) {
                    for ( var n in dirty ) {
                        if ( 'userImage' !== n ) {
                            dirty[sanitizeTxt(n)] = sanitize( dirty[n] );
                        }
                    }
                } else if ( Array.isArray( dirty ) ) {
                    var i   = 0,
                        len = dirty.length;

                    while ( i < len ) {
                        dirty[i] = sanitize( dirty[i] );
                        i++;
                    }
                } else {
                    dirty = sanitizeTxt( dirty );
                }
                
                return dirty;
            },
            i18n             = sanitize( describri18n ),
            i18nGen          = i18n.general,
            i18nChoose       = i18n.choose,
            
            describrBio,
            tagline_len      = describr.tagline_len ? parseInt( describr.tagline_len ) : 20,
            textarea_LG      = describr.textarea_LG ? parseInt( describr.textarea_LG ) : 1000,
            textarea_SM      = describr.textarea_SM ? parseInt( describr.textarea_SM ) : 300,
            ptFndTxtBx       = 'input[type="text"]',
            ptLocs           = ['current_city','hometown','lived_cities'],
            describrLangsArr = [],
            px               = ptSep,//___, triple underscore: separator
            pz               = '__',//double underscore: separate layers in classes' attributes.
            $tru             = true,
            flg              = false,
            $soc$            = 'socialnetworks',
            ptSep            = '___',
            ptSrch           = 'search',
            phoneSep         = '_',
            plugin           = 'describr',
            hid              = 'hidden',
            ahid             = ' aria-hidden="true"',
            dpurp            = 'data-purp',//Identifies input elements of type hidden that submit data
            dataAtrr         = ' data-plugin="' + plugin + '"',
            $fne             = plugin + 'phone',
            $ext             = plugin + 'ext',
            fneCntry         = 'phonecountry',
            xToBool          = function ( string ) {
                if ( 'undefined' === typeof string ) {
                    string = '';
                }
                
                if ( $tru === string || 1 === string || '1' === string ) {
                    return $tru;
                } else if ( flg === string || 0 === string || '0' === string || '' === String( string ).trim() || 'false' === string || 'undefined' === string ) {
                    return flg;
                } else {
                   return $tru;
                }
            },
            isMobile   = Object.hasOwn( describr, 'isMobile' ) ? xToBool( describr.isMobile ) : flg,       
            canEdit    = describr.profile && Object.hasOwn( describr.profile, 'canEdit' ) && xToBool( describr.profile.canEdit ),
            mainDescribr    = function ( $, _ ) {
                var clr        = i18nGen[28],
                    tStart     = 'touchstart',
                    selOpt     = ' selected="selected"',
                    selctMenu  = plugin + pz + 'selectmenu',   
                    errorTimeout,
        /**
         * Removes notices after eight seconds.
         */
        noticesDismiss = function () {
            clearTimeout( errorTimeout );

            errorTimeout = setTimeout( function() {
                doc.find( 'button[data-action="' + plugin + 'dismisserror"]' ).closest( 'div' ).remove();
            }, 20000 );
        },
        /**
         * Displays important notices to users.
         * 
         * Notices are html formatted.
         * 
         * @param string noticeType   Portion of html class that indicates the type of notice: success or error, for example.
         *                            Another class can be added to adjoined a class that will be used by JavaScript to remove
         *                            the notice.
         * @param string message      The notice to display.
         * @param bool   autoClearMsg Whether the notice should be automatically removed from the Web page.
         * @return string The notice to show the user.
         */
        notices = function ( noticeType, message, autoClearMsg ) {
            if ( ! autoClearMsg ) noticesDismiss();

            var m = '<div class="is-dismissible ' + plugin + pz + 'notice notice-';
                m += noticeType;
                m += '"><p>';
                m += message;
                m += '</p><button' + dataAtrr + ' data-purp="dismisserror" data-action="' + plugin + 'dismisserror" type="button" class="notice-dismiss"><span class="screen-reader-text">' + i18nGen[49] + '</span></button></div>';
            
            return m
        },
        html    = {
            el : function( HTML, ATTR, el ) {
                el = el || 'div';
                var htm = '<' + el;
            
                if ( ATTR ) {
                    for( var j in ATTR ) {
                        htm += ' ' + j + '="' + ATTR[ j ] + '"';
                    }
                }

                htm += '>';

                HTML && ( htm += HTML ); 

                htm += '</' + el + '>';

                return htm;
            },//el
            /**
             * Creates template for each profile section.
             * 
             * @param object obj {
             *    string header The header for the section (optional). 
             *    string id     ID for main container (optional).
             *    string clss   Class for the main container.
             *    array  table[{
             *          string th   Table header
             *          string id   ID for the profile section.
             *          string clss class for the profile section.
             *          string for  Label "for" attribute containing the ID for the element that the label element labels
             *          array  body [{
             *               object attr Contains attributes, class, id, etc, for the <td> tag (optional).
             *               string cntnt <td>'s content.
             *          }] 
             *      }]
             * }
             * @return string Section's html layout with accompanying content.
             */
            template : function( obj ) {
                var isLbl  = Object.hasOwn( obj, 'for' ) ? $tru : flg,
                    header = Object.hasOwn( obj, 'header' ),
                    htm    = '';
            
                if ( header ) {
                    htm += '<div';

                    if ( Object.hasOwn( obj, 'id' ) ) {
                        htm += ' id="' + obj.id + '"'
                    }
                    
                    if ( Object.hasOwn( obj, 'clss' ) ) {
                        htm += ' class="' + obj.clss + '"';
                    }
                    
                    htm += '><h3>' + obj.header + '</h3>';
                }
                
                obj.table.forEach( function( table ) {
                    var body  = table.body,
                        isLbl = table.for || flg,
                        wr    = table.id || table.clss ? 1 : 0;
                    
                    if ( wr ) {
                        htm += '<div';

                        if ( table.id ) {
                            htm += ' id="' + table.id + '"';
                        }

                        if ( table.clss) {
                            htm += ' class="' + table.clss + '"';
                        }

                        htm += '>';
                    }
                    
                    htm += '<table role="presentation" class="form-table"><tr><th scope="row">';

                    if ( isLbl ) {
                        htm += '<label for="' + table.for + '">';
                    }
                    
                    if ( table.th ) {
                        htm += table.th;
                    }
                    
                    if ( isLbl ) {
                        htm += '</label>';
                    }
                    
                    htm += '</th>';

                    body.forEach( function( td ) {
                        htm += '<td';
                    
                        if ( Object.hasOwn( td, 'attr' ) && Object.isObject( td.attr ) ) {
                            for ( var j in td.attr ) {
                                htm += ' ' + j + '="' + td.attr[ j ] + '"';
                            }
                        }
                                        
                        htm += '>';
                        htm += td.cntnt;
                        htm += '</td>';
                    });

                    htm += '</tr></table>';

                    if ( wr ) {
                        htm += '</div>';
                    }
                });
                
                if ( header ) {
                    htm += '</div>';
                }
                
                return htm;
            },//template
            input   : function( attr ) {
            var bx = '<input' + dataAtrr, n;

            for ( n in attr ) {
                bx += ' ' + n + '="' + attr[n] + '"';
            }
            
            bx += '>';

            return bx;
            },
            cbxWr : function( elem, attr ) {
                var bx = '<div';
               
                if ( attr ) {
                    if ( Object.isObject( attr ) ) {
                        for ( var n in attr ) {
                            bx += ' ' + n + "='" + attr[ n ] + "'"; 
                        }
                    } else {
                        bx += attr;
                    }
                }
                
                bx += '>';
                bx += elem;
                bx +='</div>';

                return bx;
            }
        },//html
        /**
         * Converts YYYY-MM-DD formatted date into array.
         * 
         * @param string Date.
         * @return array An array in which each section of the date is located at unique index.
         */
        splitDate = function( date ) {
            return ( date + '' ).split( '-' ).map( function( datePart ) {
                return int( datePart );
            });
        },
        time   = {
            lbl : [ i18n.date[0], i18n.date[1], i18n.date[2], i18nChoose[10], i18nChoose[11], i18nChoose[12] ],
            s : 1000,
            i : 60,
            h : 60*60,
            d : 60*60*24,
            w : 60*60*24*7,
            m : 60*60*24*7*4,
            y: function() {
                return this.d * ( this.isLpYr() ? 366 : 365 );
            } ,
            checkYears : function( t ) {
                return Math.floor( t/this.y() );
            },
            checkMnths : function( t ) {
                return Math.floor( t/this.m );
            },
            checkWks : function( t ) {
                return Math.floor( t/this.w );

            },
            checkDays : function( t ) {
                return Math.floor( t/this.d );

            },
            checkHrs : function( t ) {
                return Math.floor( t/this.h );

            },
            checkMins : function( t ) {
                return Math.floor( t/this.i );

            },
            /**
             * Provides the current year or a year in the past.
             * 
             * @param int ago The number of years to subtract from the current year.
             * @return int The current year or a year in the past.
             */
            newY : function( ago ) {
                var yr = new Date().getFullYear();
                
                if ( ago ) {
                    yr -= ago;
                }

                return yr
            },
            //Object of months of the year, with 2-digit represention of months as properties and text represention of months as values.  
            months : i18n.months,
            /**
             * Creates the number of years, as options, to show the user.
             * 
             * @param int latestYear The latest year from which to start, decrementing until 1900, the earliest year.
             * @return array Years to display.
             */
            years : function( latestYear ) {
                latestYear = latestYear  || this.newY();
                
                for ( var years = [], i = 0 ; latestYear >= 1900 ; i++, latestYear-- ) {
                    years[i] = latestYear;
                } 
                
                return years;
            },
            //Checks if year is a leap year. Returns true if year is a leap year, false otherwise.
            isLpYr : function( year ) {
                var y = year || this.newY();

                return ( ( y % 4 == 0 ) && ( y % 100 != 0 ) ) || ( y % 400 == 0 );
            },
            /**
             * Finds month of the year.
             * 
             * Converts month value (00) to that of array index.
             * 
             * The index will likely to be used to find text representation of a specific month.
             * 
             * The converted value is reduced by one as array indexing begins at 0.
             * 
             * @param string month The value to convert.
             * @return int Array index. 
             */
            findMonth : function( month ) {
                //Uses the character at index 1 if the first character is zero.
                if ( 2 == month.length && 0 == month[0] ) {
                    month = month[1];
                }

                month -=1;//Reduces number by one to find correct element in array.
                month = this.months[month];

                return month;
            },
            /**
             * Removed disallowed characters from dates, with only characters "0-9" and "-" allowed.
             * 
             * @param string date The date to escape.
             * @return string The date, with disallowed characters removed.
             */
            escDate : function( date ) {
                return date.replace( /[^0-9-]/, '' );
            },
            /**
             * Sets up the html date's part, so the user can select year, month, or day.
             * 
             * @param object obj{
             *             string class    The main class for the parts.
             *             string date     An existing date that will be shown instead of the defaults values. 
             *             string id       The main ID for the parts. Each part will add to ensure each part has a unique ID.
             *             string nameAttr The input element's name attribute's value. This will only be added if the user is in admin.
             *             string ago      An earlier date from which to start showing years, instead of starting from the current year.
             *             string sctn     The profile section to which the parts belong.
             *             }
             * @return string Date's parts for choosing a date, otherwise empty.
             */
            setupDate : function( obj ) {
                var u     = this,
                    clss2 = obj.class || '',//main class
                    sctn  = obj.sctn || '',//section (eg., birthdate)
                    ago   = obj.ago || '',//earlier year from which to start?
                    date  = obj.date ? u.splitDate( obj.date ) : [],//any existing date?
                    len   = date.length,
                    htm   = '',//Store html to return.
                    obj1  = {},
                    pick  = u.datePickr(),
                    p;
                
                pick.class = clss2;
                pick.note  = sctn;
                
                if ( obj.id ) {
                    pick.id = obj.id;
                }

                //Add upper-limit year for time periods. 
                if ( obj.to ) {
                    pick.future = obj.future;
                }

                if ( ! len ) {
                    date[len] = u.newY( ago );
                }  
                
                pick.date = date;
                pick.wrap = !0;

                htm += pick.year(); 
                htm += pick.month();                
                htm += pick.day();    
                
                p = date[0];

                if ( 1 < len ) {
                    p += '-' + date[1];
                }

                if ( 2 < len ) {
                    p += '-' + date[2];
                }
                
                obj1.type   = hid;
                obj1.name   = obj.nameAttr;
                obj1.value  = p;
                obj1[dpurp] = 'submit';

                htm += html.input( obj1 );

                return htm;
            },//setupDate
            datePickr : function() {
                var time1 = this;
                return {
                    curYr : new Date().getFullYear(),
                    startYr : function () {
                        var u  = this,
                            yr = u.curYr;

                        if ( u.future ) {
                            yr += u.future;
                        } else if ( u.ago ) {
                            yr -= u.ago;
                        }

                        return yr;
                    },
                    year : function() {
                        var u        = this,
                            date     = u.date,
                            label    = time1.lbl[0],
                            p        = 'year',
                            clss1    = u.class + pz + p, 
                            year     = date.length ? date[0] : u.curYr,
                            offsetYr = '',
                            htm      = '';
                        
                        if ( u.future || u.ago ) {
                            offsetYr = u.startYr();
                        }
                        
                        time1.years( offsetYr ).forEach( function( i ) {
                            htm += '<option';
                            
                            if ( year == i ) {
                                htm += selOpt;
                            }

                            htm += ' value="' + i + '">' + i + '</option>';
                        });
                        
                        if ( u.wrap ) {
                            htm = u.btn( htm, label, p, clss1 );
                        }

                        return htm;
                    },
                    month : function() {
                        var u     = this,
                            date  = u.date,
                            p     = 'month',
                            label = time1.lbl[1],
                            clss1 = u.class + pz + p, 
                            month = 1 < date.length ? date[1] : '',
                            htm   = '';
                    
                        for ( var i = 0, v, mn = time1.months, len = mn.length; i < len; i++ ) {
                            v = i + 1;
                            
                            //Convert month to two digits if less than 10.
                            if ( 10 > v ) {
                                v = '0' + v;
                            }
                            
                            htm += '<option';
                                            
                            if ( v == month  ) {
                                htm += selOpt;
                            }
                            
                            htm += ' value="' + v + '">' + mn[i] + '</option>';
                        };
                        
                        htm = '<option value="">' + label + '</option>' + htm;
                                            
                        if ( u.wrap ) {
                            htm = u.btn( htm, label, p, clss1 );
                        }

                        return htm;
                    },
                    day : function() {
                        var u      = this,
                            date   = u.date,
                            p      = 'day',
                            label  = time1.lbl[2],
                            clss1  = u.class + pz + p, 
                            isLpYr = time1.isLpYr(),
                            len    = date.length, 
                            month  = 1 < len ? date[1] : '',
                            day    = 2 < len ? date[2] : '',
                            htm    = '';

                       for ( var i = 1, $i; i <= 31; i++ ) {
                            //If both the current year is a leap year and the month is February, break before day 30, giving February 29 days.
                            if ( isLpYr ) {
                                if ( '02' == month && 30 == i ) {
                                    break;
                                }
                            } else if( '02' == month ) { //If month is February, break before day 29, giving February 28 days.
                                if ( 29 == i ) {
                                    break;
                                }
                            } else if ( 31 == i && ( '04' == month || '06' == month || '09' == month || '11' == month ) ) {
                                //If the month is either April, June, September, or November, break before day 31, giving either month 30 days.
                                break;
                            }

                            htm += '<option';
                            
                            $i = i;

                            if ( 10 > i ) {
                                $i = '0' + i;
                            }

                            if ( $i == day ) {
                                htm += selOpt;
                            }

                            //Prepends number 0 to months that have fewer than 2 digits, always obeying 2-digit-month format. 
                            htm += ' value="' + $i + '">' + i + '</option>';
                        }
                
                        htm = '<option value="">' + label + '</option>' + htm;                        
                        
                        if ( u.wrap ) {
                            htm = u.btn( htm, label, p, clss1, day );
                        }

                        return htm;
                    },//day
                    btn : function ( options, label, part, clss, curVal ) {
                        var u   = this,
                            htm = '<select data-purp="date" data-activity="';

                        htm += u.note;
                        htm += '" data-part="';
                        htm += part;
                        htm += '" aria-label="';
                        htm += label;
                        htm += '" id="';
                        
                        if ( u.id ) {
                            htm += u.id + '-' + part;
                        } else {
                            htm += class2Id( clss );
                        }
                        
                        htm += '" class="';
                        htm += clss;
                        htm += ' ';
                        htm += selctMenu;
                        htm += '"';
                        
                        //If day, set default value, which is used in jquery selectmenu to decide whether the menu button will be automatically shown.
                        if ( 'day' == part ) {
                            htm += ' data-curval="';

                            if ( '' === curVal ) {
                                curVal = '-';
                            }

                            htm += curVal;
                            htm += '"';
                        }

                        htm += '>';
                        htm += options;
                        htm += '</select>';

                        return htm;
                    }
                }//return
            }//datePickr     
        },//time
        /**
         * Creates dashicon.
         * @param object obj{
         *   string class Additional class to add to the dashicon element.
         *   string icon  The specific icon to display.
         * }
         * @return string The dashicon to display.
         */
        icons = {
            init : function( obj ) {
                htm = '<span' + ahid + ' class="';

                if ( obj.class ) {
                    htm += obj.class;
                }

                htm += pz + 'icon dashicons dashicons-' + obj.icon + '"></span>';

                return htm;
            },
            warning : function( obj, $section$ ) {
                obj = obj || {};
                var icon = 'warning';
                
                obj.icon = icon;                

                if ( obj.class ) {
                    obj.class += pz + icon;
                }
                
                return '<p class="' + obj.class + '">' + sprintf( i18nGen[34], $section$ ) + '</p>';
            },
            /**
              * Generates html button element. 
              * 
              * @param attr Object with properties as the button's attributes and values as the button's attributes' values.
              * @return string html button element.
              */
            btnGen : function( attr ) {
                var btn  = '<button' + dataAtrr,
                    type = 'button',
                    a,
                    p;

                for ( a in attr ) {
                    p = attr[a];
                    //Changes the type from the default, 'button,' to the type passed in the argument.
                    if ( 'type' == a ) {
                        type = p;
                        continue;//Skips attaching type attribute here as it will be subsequently attached. 
                    } else if ( 'txt' == a ) {
                        continue;
                    }
             
                    btn += ' ' + a + '="' + p + '"';
                }

                btn += ' type="' + type + '"'; 
                btn += '>';
            
                if ( Object.hasOwn( attr, 'txt' ) ) {
                    btn += attr.txt;
                }

                btn += '</button>';

                return btn;
            },//btnGen
            /**
             * Creates button used to remove text from controlled textbox.
             * 
             * @param object obj Additional attrbutes for the button.
             * @return string Customized button used to clear textbox.
             */
            clrTxt : function( obj ) {
                var obj1 = mnObj.clrObj, n, c = 'class';

                for ( n in obj ) {
                    obj1[n] = obj[n];
                }
                
                //Adds the dashicon classes to existing classes so the "x" can be displayed on the button.
                obj1[c] = obj1[c] + pz + 'button dashicons-before dashicons-no-alt';

                return this.btnGen( obj1 ); 
            },
            prvcy : {
                priv : 'privacy',
                init   : function( status ) {
                    if ( 'undefined' === typeof status ) status = 1;
                    var self = this,
                        priv = self.priv,
                        clss = self.clss + pz + priv,
                        opts = [], 
                        obj  = { id : class2Id( clss ), class : clss, purp : priv, label : self.label + '" title="' + i18nGen[46] },
                        htm  = '';
                    
                    self.options.forEach( function ( option ) {
                        var item = {
                            value : option.val,
                            label : option.txt
                        };

                        if ( option.val == status ) {
                            item.selected = !0;
                        }
                        
                        opts.push( item );
                    });

                    obj.option = opts;             

                    obj.extra = [ html.input( { type : hid, name : self.name + '[visibility]', value : status, 'data-purp': 'submit' } ) ];
                    
                    return select( obj );
                },                
                //List of privacy options from which users can select.
                options : [ { val : 1, txt : i18n.privacy[0] }, { val: 0, txt : i18n.privacy[1] } ]
            },//privacy
            dsbld : ' disabled="disabled"',
            
            /**
             * Changes html attribute by removing the last part of the attribute and appending string that will uniquely identify another element.
             * 
             * @param object obj{
             *          string attr The attribute to change.
             *          string sep  The character used to convert the attribute to an array.
             *          string join The character used to rejoin parts of the attribute.
             *          string end  The string that identifies another element.         
             * }*/
        chgAttr : function( obj ) {
            return obj.attr.split( obj.sep ).slice( 0, -1 ).join( obj.join ) + obj.join + obj.end;
        }
    },//icons
    mnObj = {
        clrObj           : { 'data-purp' : 'clear', 'aria-label' : clr, 'title' : clr },
        chckd            : ' checked="checked"',
        popstate         : !!_.history.pushState,
        fileApiSupported : !!(_.File && _.FileReader && _.FileList && _.Blob),
        click            : tStart in document.documentElement ? 'click ' + tStart : 'click',      
        //Prevents false positive click event when user swipes on touchscreen devices
        pc : function( e ) {
            var type = e.type,
                z,
                touch,
                positionX;
            
            if ( ! /(touchstart)/.test( document.documentElement ) ) {
                return $tru;
            }

            if ( tStart == type  ) {
                z         = $tru;
                touch     = e.targetTouches;
                positionX = touch[ touch.length-1 ].pageX;

                e.target.ontouchend = function( _ ){
                    touch = _.targetTouches;
                    
                    if ( touch[touch.length-1].pageX != positionX ) {
                        z = flg;
                        e.preventDefault();
                    }
                }
        
                return z;
            } else if( 'click' == type ){
                return $tru;
            }
    
            return flg;
        }//pc
    };//mnObj


    /**
     * Displays parts of address separated by commas
     * 
     * Removes country from address if it's United States 
     * 
     * @param string addr The address to display
     * @return string The address.
     */  
    function displayAddr ( addr ) {
        var sep  = ', ',
            city = addr.city.split( sep );

        if ( 3 == city.length && 'United States' == city[2] ) {
            city.pop();
        }

        city = city.join( sep );
        
        return city;
    }
    
    /**
     * Suggests cities using keywords.
     * 
     * @param string addr The keywords.
     * @return array Cities that fully or partially matched the keywords.
     */
    function citiesFnd ( addr ) {
        var citiesFound = [], 
            citiesFnd1 = [], 
            len;

        if ( ! ( addr = addr.trim() ) ) return citiesFound;
        
        addr = addr.toLowerCase().split( /\s*(?:,|\/)\s*/, 3 );
        len  = addr.length;

        if ( '' == addr[len-1] ) {
            addr.pop();
            len = addr.length;
        }

        if ( len ) {
            $.each( describrCities, function() {
                var city      = this,
                    cityName  = city.name,
                    cityName_ = cityName.toLowerCase(),
                    countryCode = city.countryCode;

                if ( 0 === cityName_.indexOf( addr[0] ) ) {
                    citiesFound.push({
                        name        : cityName,
                        state       : findState( { stateCode : city.stateCode, countryCode : countryCode } ).name,
                        country     : findCountry( countryCode ).name,
                        countryCode : city.countryCode,
                        twin_city   : ( ( function() {
                            //By default, assume that only one of each city exists.
                            var isTwinCity = 0;
                                
                            //Iterates over cities already found and checks if this city already exists.
                            citiesFound.map( function( _city ) {
                                var twinCity = _city.twin_city;//twinCity of already saved city.
                                    
                                //Is the city (cityName) being added  a twin city of an already saved city (city.name)?
                                if( cityName == _city.name ) {
                                    if ( ! twinCity ) {
                                        twinCity = 1;
                                    }
                                        
                                    isTwinCity = 1;
                                }

                                _city.twin_city = twinCity;

                                return _city;//This return is for citiesFound.map.
                                });

                            return isTwinCity;//This return is for twinCity:.
                        })())
                    });//Push ends here.
                }
            });
            
            for ( var i = 0, len1 = citiesFound.length; i < len1; i++ ) {
                var city    = citiesFound[i],
                    country = city.country,
                    state   = country2State( city.name, country );

                if ( ! state ) {
                    state = city.state.toLowerCase()
                }
                
                country = country.toLowerCase();
                state   = state.toLowerCase();

                if ( 3 == len && 0 !== state.indexOf( addr[1] ) && 0 !== country.indexOf( addr[2] ) ) {
                    continue;
                }

                if ( 2 == len && 0 !== state.indexOf( addr[1] ) ) {
                    continue;
                }

                citiesFnd1[ citiesFnd1.length ] = city;
            }
        } 
        
        return citiesFnd1;
    };//citiesFnd
    
    /**
     * Suggests cities using keywords
     * 
     * @param array  cities  Potential cities that may match the keywords.
     * @return array List of cities
     */
    function srchCity ( cities ) {
        cities = cities.sort( sortCities );

        var results = [],
            len     = cities.length,
            i       = 0;

        for ( ; i < len; i++ ) {
            var city     = cities[i],
                nameCity = city.name,
                state    = city.state,
                country  = city.country,
                nameState,
                city_,
                _city;

            if ( state ) {
                city_ = nameCity + ', ';

                if ( country ) {
                    nameState = country2State( nameCity, country );
                }
                    
                if ( nameState ) {//Country serves as state, so there's no need to add the country twice.
                    city_ += nameState;
                } else {
                    city_ += state + ', ' + country;
                }

                city.city = city_;

                _city = displayAddr( city );
                

                results[results.length] = itemInfo( 'city', _city, _city );
            }
        }
        
        return results;
    };//srchCity
    
    /**
     * Suggests cities per user-generated keywords.
     * 
     * @param jquery object city The input element of type text.
     * @return string various cities from which the user may choose.
     * */
    function userSrchCity ( city ) {
        return srchCity( citiesFnd( city ) );
    }
    
    //Finds state both by name and by country-code.
    function findState ( find ) {
        for ( var i = 0, states = describrLocation.states, len = states.length; i < len; i++ ) {
            var state = states[ i ];
                
            if ( ( find['name'] == state.name || find['countryCode'] == state.countryCode ) && find['stateCode'] == state.isoCode ) {
                return state;
            }
        }
                                    
        return '';
    }

    /**
     * Fetches a country from the describrLocation array.
     * 
     * @param string find The isocode or name of the country for which to search.
     * @return object The country's name, isoCode, etc, othwise an empty string.
     */
    function findCountry ( find ) {
        for ( var i = 0, countries = describrLocation.countries, len = countries.length; i < len; i++ ) {
            var country = countries[ i ];

            if ( find == country.isoCode || find == country.name ) {
                return country;
            }
        }
                                    
        return '';
    }
        
    //Sorts cities alphabetically.
    function sortCities ( a, b ) {
        var order = a.name.localeCompare( b.name );

        if ( 0 === a.name.indexOf( 'Santo Domingo' ) && 0 === b.name.indexOf( 'Santo Domingo' ) && 'DO' == a.countryCode && 'DO' == b.countryCode ) {
            order = -1;
        } else if ( 0 === a.name.indexOf( 'Kingston' ) && 0 === b.name.indexOf( 'Kingston' ) && 'JM' == a.countryCode && 'JM' == b.countryCode ) {
            order = -1;
        }

        if ( 'Boston' == b.name && 'PH' == b.countryCode  ) {
            order = -1;
        } 

        if ( 0 === a.name.indexOf( 'Boston' ) && 'Boston' != a.name ) {
            order = 1;
        } 
            
        return Math.sign( order );
    }

    //Deals with special cases where it is more appropriate to display the country's name instead of the state's name
    function country2State ( city, country ) {
        if ( 'Dominican Republic' == country && 0 === city.indexOf( 'Santo Domingo' ) ) {
            return country;
        } else if ( 'Jamaica' == country && 0 === city.indexOf( 'Kingston' ) ) {
            return country;
        }

        return '';
    }//City-search functions end here.
        
    /**
     * Creates id from class, replacing __ with -.
     * @param string j class to convert to id.
     * @return string Id.
     */
    function class2Id ( j ) {
        return ( j + '' ).replace( /__/g, '-' );
    }//class2Id

    /**
     * Removes the continent from the time zone
     * 
     * @param string tz Time zone
     * @param string The time zone with continent removed
     */
    function tzRemoveContinent ( tz ) {
        var sep = '/',
            arr = [],
            arr1;

        if ( tz && -1 !== tz.indexOf( sep ) ) {
            arr1 = tz.split( sep );

            for( var i = 0 ; i < arr1.length; i++ ) {
                var part = arr1[i];

                if ( part == arr1[0] ) {
                    continue;
                }

                arr[arr.length] = part;
            }

            tz = arr.join( sep );
        }

        return tz;
    }

    function select ( obj ) {
        var htm = '<select data-purp="' + obj.purp + '" aria-label="' + obj.label + '" id="' + obj.id + '"';
                
        if ( obj.attr ) {
            for ( var k in obj.attr ) {
                htm += ' ' + k + '="' + obj.attr[ k ] + '"';
            }
        }

        htm += 'class="' + selctMenu;

        if ( obj.class ) {
            htm += ' ' + obj.class;
        }

        htm += '">';
        
        if ( obj.tz ) {
            htm += findTz( obj.tz.cur, 1 );
        } else {
            obj.option.forEach( function( opt ) {
                htm += selectOptions( opt );
            });
        }

        htm += '</select>';

        //Are there extra html elements? If yes, add them.
        if ( obj.extra ) {
            obj.extra.forEach( function( elem ) {
                htm += elem;
            });
        }

        return htm;
    }
    
    function selectOptions ( option, tz ) {
        var htm   = '<option value="' + option.value + '"', 
            label = option.label;

        if ( option.selected ) {
            htm += ' selected="selected"'
        }
        
        if ( tz ) {
            label = tzRemoveContinent( label );
        }

        htm += '>' + label + '</option>';

        return htm;
    }

    function findTz ( tz, option ) {
        var htm = '', continent;

        for ( continent in describrtz ) {
            var optGrpLbl;
                    
            if ( option ) {
                if ( /Manual_Offsets/.test( continent ) ) {
                    optGrpLbl = i18n.timezone[0];
                } else {
                    optGrpLbl = sprintf(
                        i18n.timezone[1], 
                        continent
                    );
                }

                htm += '<optgroup label="' + optGrpLbl + '">';
            }
                    
            describrtz[continent].forEach( function ( item ) {
                if ( tz == item.value ) {
                    if ( option ) {
                        item.selected = !0;
                    } else {
                        htm = item.display;
                    }
                }

                if ( option ) {
                    item.label = item.display;
                    htm += selectOptions( item, $tru );
                }
            });
                    
            if ( option ) {
                htm += '</optgroup>';
            }
        }

        return htm;
    }

    /**
     * Removes non-numeric characters from param.
     * 
     * This method takes into consideration numbers starting with zero, which is sometimes not done by JavaScript's built-in parseInt function.
     * 
     * @param string|int The number to parse.
     * @return int The number with non-numeric characters removed.
     */
    function int( num ) {
        return num ? String( num ).replace( /[^0-9]+/g, '' ).trim() : '';
    }

    /**
     * Creates the object that stores data for list items (jquery autocomplete)
     * 
     * @param string type Indicates what the current list items are about
     * @param string label The text of the list item
     * @param string val   The value of the list item
     * @param string extra Miscellaneous info relating the list item
     * @return object Info relating to the list item
     */
    function itemInfo ( type, label, val, extra ) {
        var arr  = [ 'type', 'label', 'value'],
            len  = arr.length,
            obj  = {},
            i    = 0,
            args = arguments,
            len1 = args.length;
            
        for (; i < len; i++ ) {
            obj[ arr[ i ] ] = sanitizeTxt( args[ i ] );
        }
            
        //Additional argument was passed if both arrays are not equal in length, so we add the extra argument to the returned object.
        if ( len !== len1 ) {
            obj[ 'extra' ] = sanitizeTxt( args[ len1 - 1 ] );
        }
            
        return obj;
    }//itemInfo
    time.splitDate = splitDate;
    
    mnObj.time        = time;
    mnObj.findTz      = findTz;
    mnObj.icons       = icons;
    mnObj.icons.int   = int;
    mnObj.select      = select;
    mnObj.class2Id    = class2Id;
    mnObj.displayAddr = displayAddr
    mnObj.html        = html;
    mnObj.findCountry = findCountry;
    mnObj.phoneNumber = {
        inputId   : plugin +'-input-phonenumber',//ID input tag that stores the phone numbers sent to the server.
        countries : ["AC","AD","AE","AF","AG","AI","AL","AM","AO","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GT","GU","GW","GY","HK","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TA","TC","TD","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","XK","YE","YT","ZA","ZM","ZW"],
        /**
         * Uses the libphonenumber object to parse phone numbers.
         * @param object obj {
         *    string phoneNumber The phone number in question.
         *    string country     The country to which the phone numbers belong (optional).
         * } 
         * @return object|bool The specifications for the phone number, otherwise False if the number could not be parsed.
         */
        getPhoneNumber : function ( obj ) {
            var phoneNumber = obj.nationalNumber,
                options     = { extract : flg },
                h           = 'phoneNumberOld';//Used to check if old phone number exists
                        
            if ( obj.country ) {
                options.defaultCountry = obj.country;
            }
            
            try {
                phoneNumber = libphonenumber.parsePhoneNumberWithError( phoneNumber, options );
            } catch( error ) {
                phoneNumber = { nationalNumber : phoneNumber  };
                
                if ( error.message ) {
                    phoneNumber.errorMsg = error.message;
                }
            }

            //Sometimes there is a mismatch between the country code supplied and the one returned by libphonenumber.parsePhoneNumberWithError,
            //so we make sure the country code supplied is actually the one returned.
            if ( obj.country ) {
                phoneNumber.country = obj.country;
            } 
            
            //Attach the old phone number to the object being returned.
            if ( obj[h] ) phoneNumber[h] = obj[h];

            return phoneNumber;
        }//getPhoneNumber
    }//mnObj.phoneNumber
    /**
     * Verifies phone numbers.
     * 
     * This method is called when a country code is selected (listener for click event on div[role="option"]), 
     * a number is typed in the phone number's text box (listener for blur event on input[type="text"]), 
     * and an extension is typed in the extension's text box (listener for blur event on input[type="text"]).
     * 
     * @param jQuery object prnt The html wrapper for parts, country code, phone number, and extension, of the phone number.
     * @param string val    The part of the phone number being addressed.
     * @param object phones The object that contains error messages pertaining to phones.
     */
    mnObj.phoneNumber.verifPhne = function( prnt, val, phones ) {
        var u      = this,
            disErr = '.is-dismissible',//Class of div that is used to display errors.
            phone  = {},
            fneNum = '',//phone number
            cCode,//country code 
            ext,//extension
            fneNumParts,
            classErr;

        //Remove existing error.
        prnt.find( disErr ).remove();
        
        u.prnt = prnt;

        //Get the country code, phone number, and extension of the phone number in question.
        fneNumParts = prnt.children( 'div' ).not( disErr ).each( function() {
            var wrap       = $( this ),
                fneNumPart = wrap.find( 'select' ),
                val2       = '',
                data;
                        
            //Get the country code from the combobox's "data-countrycode" attribute.
            if ( fneNumPart.length ) {
                data = fneNumPart.data(); 
                        
                //Does a country code exist?
                if ( data.countrycode ) {
                    cCode = data.countrycode;//Set the country code
                } 
            } else {
                fneNumPart = wrap.find( ptFndTxtBx ).eq(0);
                data       = fneNumPart.data();
                val2       = fneNumPart.val().trim();
                            
                if ( $fne == data.info ) {
                    fneNum = val2;//Set phone number

                    u.curNumTxtbox = fneNumPart;
                } else {
                    ext = val2;//Set ext.
                }
            }  
        });//each
                   
        //We must have both country code and phone number before the number can be verified.
        if ( cCode && fneNum ) {
            phone.country = cCode;

            if ( ext ) {
                fneNum += ' ' + libphonenumber.getExtPrefix( cCode ) + ' ' + ext;
            }
                        
            phone.nationalNumber = fneNum;
                 
            fneNum = u.getPhoneNumber( phone );
            
            if ( fneNum.errorMsg ) {
                classErr = 'error';

                if ( ! isMobile ) {
                    classErr += '" style="' + phones.htm.width; 
                }
                //Attach the error message under the div that wraps the extension's input tag. 
                fneNumParts.eq( fneNumParts.length - 1 ).after( notices( classErr, phones.htm.errorsPrep( fneNum.errorMsg ) ) );
                    
                //Since there are errors, we set this variable to false so that this phone number can be marked for deletion.
                fneNum = '';
            } 
        }

        //Make the necessary changes to submitted value.          
        prnt.find( 'input[' + dpurp + '="submit"]' ).val( fneNum && Object.isObject( fneNum ) ? fneNum.formatNational() + phoneSep + fneNum.country : '' );
    };//verifPhne
    
    /**
     * Validates email address and displays any errors.
     * 
     * @param jquery object The input tag in which the user types the email address.
     * @param object obj The object that has all the methods and properties that address email addresses.
     */
    mnObj.verifEmail = function( input, obj ) {
        var err = obj.validate.init( input.val() );
        err && input.parent().after( err );
    };//verifEmail
    
    mnObj.social = {
        //regex for network/handle
        regXFull   : /^([a-z]{2,3})\/([a-zA-Z0-9_\.]+)$/,
        regXHandle : /[^a-zA-Z0-9_\.]+/,//negative regex for the handle
        /**
         * Updates submitted value.
         * 
         * @param jquery object prntOfnetworkAndHandle parent element of both network and handle.
         */
        update : function ( prntOfnetworkAndHandle ) {
            var prnt   = prntOfnetworkAndHandle,
                network = prnt.find( 'select' ).data( 'curnet' ),
                handle = prnt.find( ptFndTxtBx ).val(),
                submit = prnt.find( 'input[data-purp="submit"]' ),
                subVal = submit.val() || '',
                update = !1,
                u      = this;
            
            //Abort if the existing value fails validation.
            if ( subVal && ! u.regXFull.test( subVal ) ) {
                submit.val( '' );
                return;
            }
            
            //Mark the network for deletion if the text box for the handle is empty.
            if ( handle && u.types[network] ) {
                subVal = network + '/' + handle;
                update = !0;
            } else if ( subVal ) {
                subVal = '';
                update = !0;
            }

            update && submit.val( subVal );
        }
    };//social

    /**
     * Generic text box attributes.
     * 
     * @var object*/
    mnObj.txtBx = {
        type         : 'text', 
        spellcheck   : flg, 
        autocomplete : 'off'
    };

    /**
     * Generic attributes for text box with role as combobox.
     * 
     * Attributes not included include aria-controls, aria-label, placeholder, class, and id.
     * 
     * @var object*/
    mnObj.attrCBx = {
        type                : 'text',
        role                : 'combobox',
        'aria-autocomplete' : 'list',
        'aria-haspopup'     : 'listbox',
        'aria-expanded'     : flg,
        'aria-live'         : 'polite',
        spellcheck          : flg,
        autocomplete        : 'off'
    };

    /**
     * Generic method that is used to sort date-related arrays in descending order.
     * 
     * @param string a Array element.
     * @param string b Array element.
     * @return int 0 Keep original order of a and b, -1 Sort a before b, 1 Sort a after b.
     */
    mnObj.cmpDates = function( a, b ) {
        var full = /[0-9]{4}(\-[0-9]{2})?(\-[0-9]{2})?((?:\s+|T)[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]+)?(?:Z|z)?)?/,
            iso  = /\s+(?=[0-9]{2})/,
            t    = 'T',
            pr;
        
        //Check if date is a time period,
        if ( a.timeperiod ) {
            pr = 'present';

            a = a.timeperiod.split( pz );
            b = b.timeperiod.split( pz );
            
            //Activities the user is still participating in naturally come first.
            if ( pr == a[1] && pr != b[1] ) {
                return -1;
            }

            if (  pr != a[1] && pr == b[1] ) {
                return 1;
            }

            if ( pr == a[1] ) return -1;
            if ( pr == b[1] ) return 1;

            if ( a.name ) {//schools
                if ( a.graduated && ! b.graduated ) return 1;
                if ( ! a.graduated && b.graduated ) return -1;

                if ( a.graduated ) return 1;
                if ( b.graduated ) return -1;
            }
            
            //Compare the "to" date (located at index 1).
            a = a[1];
            b = b[1]; 
        } else if ( a.moved ) {//date user moved from city
            a = a.moved;
            b = b.moved;
        }
        
        if ( ( a = String( a ).match( full ) || 0 ) && ( b = String( b ).match( full ) || 0 ) ) {
            if ( 0 !== a ) a = a[0];
            if ( 0 !== b ) b = b[0];
            //Ensures conformity to ISO 8601, which ensures compatibility across browsers
            a = a.replace( iso, t );
            b = b.replace( iso, t );

            a = new Date( a ).getTime();
            b = new Date( b).getTime();

            if ( a == b ) {
                return 0;//Keep original order of a and b
            } else if ( a > b ) {
                return -1; //Sort a before b
            } else {
                return 1;//Sort a after b
            }
        } else {
            return 0;
        }
    };//cmpDates
    
    /**
     * Provides a uniform way to display contents of the profile when not in editing mode.
     * 
     * @param object obj{
     *   object class    Classes for each layer.
     *   string title     The title for the section (optional).
     *   string clssIcon  Part of the main class that identifies the type of icon, phone or gender (optional).
     *   string clssCntnt Part of the main class that identifies the main content div.
     *   string cntnt     Content for the section.
     *   string type      The label for the section (optional).
     *   string extra     Extra content to be added to the section (optional).
     *}
     * @return string The section in question.
     */
    mnObj.subsctn = function ( obj ) {
        var htm   = '',
            c     = 'class',
            clss1 = obj[c]['main'],
            aux   = clss1 + pz + 'symbol';
        //clssIcon: __phone
        htm = '<div aria-' + hid + '="true" class="' + aux + '"';

        if ( obj.title ) {
            htm += ' title="' + obj.title + '"';
        }
        
        htm += '><span class="'; 

        if ( obj[c].icon ) {
            htm += aux + pz + obj[c].icon;
        }
        
        htm += 'mainsprite ' + obj.icon + '"></span></div>';

        aux = clss1 + pz + obj[c].cntnt;

        htm += '<div class="' + aux + '">';
        
        if ( obj[c].subcon ) {
            htm += '<div class="' + aux + pz + obj[c].subcon + '">';
        }
        
        htm += obj.cntnt;//Add the content.

        if ( obj[c].subcon ) {
            htm += '</div>';
        }              
        
        htm += '</div>';

        if ( obj.type ) {
            htm += '<div class="' + aux + pz + 'type">';
            htm += obj.type;
            htm += '</div>';
        }
        
        if ( obj.extra ) {
            htm + obj.extra
        }

        htm += '</div>';

        return htm;
    };//subsctns
    
    //Provides module for textarea or input elements that have number-of-characters restriction.
    mnObj.limitChars = {
        mxLen : textarea_SM, //Character limit
        rows : 5,
        cols : 50,
        name : 'description',
        purp : 'bio',
        label : i18nGen[26],
        placeholder : i18nGen[32],
        type : 'textarea',
        init : function () {
            var u        = this,
                name     = u.name,
                clss1    = u.clss,
                clss2    = clss1 + pz + name,
                nameAttr = u.nameAttr,//describr[bio]
                type     = 'textarea',
                type1    = type,
                desc     = '',
                htm      = '',
                exist    = u.exist || {},
                o        = 'off',
                obj      = { class : clss2, name : nameAttr + '[' + name + ']'/*name="describr[sectionX][description]"*/, maxlength : u.mxLen, spellcheck : !1, autocomplete : o },
                id,
                clss3;
            
            if ( u.placeholder ) {
                obj.placeholder = u.placeholder;
            }

            if ( u.id ) {
                obj.id = u.id;
            }

            obj[dpurp] = u.purp;

            if ( u.for ) {
                obj.id = u.for;
            } else if ( u.label ){
                obj['aria-label'] = u.label;
            }

            if ( exist[name] ) {//describr[bio][description]
                desc = exist[name];
            } else if ( u[name] ) {
                desc = u[name];
            }
             
            //Truncate the length of bio if the length is over the limit.
            desc = u.trunc( desc);

            if ( canEdit || desc ) {
                if ( canEdit ) {
                    htm = '<div class="' + clss2 + '">';
                        
                    //textarea
                    if ( type == u.type ) {
                        obj.rows = u.rows;
                        obj.cols = u.cols;
                    } else{
                        type1 = u.type;
                    }

                    obj.class += pz + type1;

                    if ( u.clss1 ) {
                        obj.class += ' ' + u.clss1;
                    }
                    
                    if ( type == u.type ) {
                        obj['data-plugin'] = plugin;
                        
                        htm += html.el( desc, obj, type1 );
                    } else {
                        obj.type = 'text';

                        if ( desc ) {
                            obj.value = desc;
                        }

                        u.size && ( obj.size = u.size );

                        htm += html.input( obj );
                    }

                    clss3 = clss2 + pz + 'limit';
                        
                    htm += '<div' + ahid + ' class="' + clss3 + '">';
                        
                    u.classCurLenReached = clss3 + pz + 'reached';//Used to locate, and change the color of, this element from the keyup's event listener attached to textarea.
                        
                    clss3 += pz + 'current';
                        
                    u.classCurLen = clss3;//used to locate this element from the keyup's event listener attached to textarea.

                    htm += '<span class="' + clss3 + '">' + u.getLen( desc ) + '</span>/' + sprintf( i18n.placeholders[0], u.mxLen ) + '</div>';
                    
                    clss3 = clss2 + pz + 'accessibility';

                    htm += '<div aria-live="polite" class="' + clss3 + '">' + u.access( desc ) + '</div>';//accessibility
                    
                    u.classAcc = '.' + clss3;//used to notify screen readers of the number of allowed characters remaining.

                    htm += '</div>';//main wrapper

                    if ( u.ctrls ) {
                        htm += u.ctrls.init( exist );
                    }
                } else {
                    htm = desc;
                }
            }
             
            return htm;
        },//init
        /**
         * Gets the number of characters making up the str.
         * 
         * @param string str Characters that make up str.
         * @return int Lenth of str.
         */
        getLen : function ( str ) {
            return str.length || 0;
        },//getLen
        /**
         * Checks if str is greater than the 300-character limit.
         * 
         * @param string str Characters that make up str.
         * @return bool True if Bio's length is less than or equal to limit, otherwise False.
         */
        isMxLen : function( str ) {
            return str && this.getLen( str ) >= this.mxLen;
        },//isMxLen
        /**
         * Truncates the Bio text to fit the character's limit.
         * 
         * @param string str Characters that make up str.
         * @return string Bio truncated or empty.
         */
        trunc : function( str ) {
            return this.isMxLen( str ) && str.slice( 0, this.mxLen ) || str || '';
        },//trunc
        /**
         * Notifies screen readers of the number of characters present in the str's textarea element as the user types.
         * 
         * @param string str Characters that make up strgraphical information.
         * @return string The notice.
         */
        access : function( str ) {
            return sprintf(
                i18n.placeholders[1],
                ( str.length || 0 ),
                this.mxLen
            );
        }
    };

    mnObj.url = {
        scheme : /^(https?:\/\/)/,
        full   : /^(https?:\/\/)?([w]{3}\.)?[a-z0-9\.-]{3,}\.[a-z]{2,}(\.[a-z]{2,})?(\/([^/\s\\]+.*)*)?$/i,
        encode : function ( url ) {
            if ( ! url ) return '';
            url = url.trim();
            
            if ( url === decodeURIComponent( url ) ) {
                url = encodeURI( url )
                .replace( /%5B/g, '[' )
                .replace( /%5D/g, ']' )
                .replace( /[!'\(\)\*]+/g, function( c ) {
                    return '%' + c.charCodeAt( 0 ).toString( 16 ).toUpperCase();
                });
            }

            return url;          
        },
        decode : function ( url ) {
            var htmlEnt = {
                '"'  : 34,
                "'"  : 39,
                '&'  : 38,
                '<'  : 60,
                '>'  : 62,
                '%'  : 37,
                '['  : 91,
                ']'  : 93,
                '{'  : 123,
                '}'  : 125,
                '|'  : 124,
                '^'  : 94,
                '('  : 40,
                ')'  : 41,
                '\\' : 92,
                ' '  :32
            };
  
            try {
                url = decodeURIComponent( url );
            } catch ( e ) {
                return '';
            }

            return url.replace( /[&<>%\s\[\]\|^{}\\"']+/g, function( m ) { return '&#' + htmlEnt[m] + ';';} );
        },
        /**
         * Validates the URL, on blur.
         * 
         * @param jquery object el The input element containing the URL.
         */
        validate : function ( el ) {
            var u   = this,
                url = el.val().trim();
            
            if ( url ) {
                //Add a scheme if none was typed.
                if ( ! u.scheme.test( url ) ) {
                    url = 'http://' + url;
                }
                
                //Does the URL meet specification?
                if ( ! u.full.test( url ) ) {
                    //Notify the user that URL was not validated.
                    el.parent().after( notices( 'error', i18nGen[35] ) );
                }
            }
        }
    };
    
    /**
     * Creates an object with its prototype being an existing object, essentially functioning the same as Object.create without the second parameter.
     * 
     * This is used as Object.create is too long.
     * 
     * @param object o The existing object.
     * @return object The new object.
     */
    mnObj.newObj = function( o ) {
        function F() {};
        F.prototype = o;

        return new F();
    };

    mnObj.selectmenu = function ( curMenu ) {
        if ( ! curMenu ) {
            curMenu = '.' + selctMenu;
        }
        var $this          = this,
            phoneNum       = $this.phoneNumber,
            describrPhones = describrBio['contact']['phones'],
            menus          = doc.find( curMenu ),
            t              = 'input[' + dpurp + '="submit"]',
            submitInput,
            menuType,
            elem,
            val$;
        
        function removeOptionEmptyVal ( menu ) {
           menu.find( 'option' ).each( function ( index ) {
                var option = $( this );

                if ( ! option.val() ) {
                    option.remove();
                    menu.selectmenu( 'refresh' );
                }
            });
        }

        function countryFlag ( countryCode, countryName ) {
            var htm = '';
            
            if ( ! ( countryCode && countryName ) ) {
                return htm
            }

            if ( describrPhones.htm.flagExists( countryCode ) ) {
                htm = '<span class="ui-selectmenu-text-flag">' + countryName + '</span> ' + describrPhones.htm.countryFlag( countryCode );
            } else {
                htm = countryName;
            }

            return htm;
        }

        menus.selectmenu({
            create : function () {
                var select             = $( this ),
                    ui                 = select.data( 'ui-selectmenu' ),
                    title              = select.attr( 'title' ),
                    data               = select.data(),
                    purp$              = data['purp'],
                    label              = select.attr( 'aria-label' ),
                    clssMenu           = select.attr( 'class' ).split( ' ' )[1] + pz + 'menu',
                    clssMenuItem       = clssMenu + pz + 'item',
                    clssMenuItemOption = clssMenuItem + pz,
                    btn                = doc.find( '#' + ui.ids.button ).attr( { title : title, 'aria-label' : label } ),
                    selected;
                
                if ( 'timezone' == purp$ ) {
                    clssMenuItemOption += 'optgroup' + pz;
                } else if ( $soc$ == purp$ ) {
                    btn.css( { 'min-height' : '30px', 'vertical-align' : 'top' } );
                }

                clssMenuItemOption += 'option';

                //Display previously selected country's flag in combobox.
                if ( fneCntry == purp$ ) {
                    selected = select.find( 'option:selected' );

                    if ( selected.length && selected.val() ) {
                        selected = countryFlag( selected.val(), selected.text() );
                        
                        if ( selected ) {
                            btn.find( '.ui-selectmenu-text' ).html( selected );
                        }
                    }
                }

                if ( 'privacy' != purp$ ) {
                    btn.addClass( plugin + '-ui-selectmenu-button' );

                    //Hide the button if day doesn't have a previously selected value.
                    if ( 'date' == purp$ && 'day' == data['part'] && '-' == data['curval'] ) {
                        btn.hide();
                    }
                }
                
                ui._renderButtonItem = function ( item ) {
                    var label      = item.label,
                        buttonItem = $( '<span>', { class: 'ui-selectmenu-text' } );

                    if ( fneCntry == purp$ ) {
                        label = countryFlag( item.value, label );
                    }

                    return buttonItem.append( label );
                }

                ui._renderMenu = function ( ul, items ) {
                    var that   = this,
                        label$ = '';               
                                                              
                    $.each( items, function( index, item ) {
                        that._renderItemData( ul, item );
                    });                    

                    ul.addClass( clssMenu );
                    ul.css( 'max-height', '250px' );

                    if ( 'privacy' == purp$ ) {
                        label$ = sprintf(
                            i18nChoose[5],
                            label.split( ' for ' )[1]
                        );
                    } else if ( 'gender' == purp$ ) {
                        label$ = i18nChoose[2];
                    } else if ( 'status' == purp$ ) {
                        label$ = i18nChoose[9];
                    } else if ( fneCntry == purp$ ) {
                        label$ = i18nChoose[1];
                    } else if ( 'timezone' == purp$ ) {
                        label$ = i18nChoose[4];
                    } else if ( $soc$ == purp$ ) {
                        label$ = label;
                    } else if ( 'date' == purp$ ) {
                        if ( 'year' == data['part'] ) {
                            label$ = time.lbl[3];
                        } else if ( 'month' == data['part'] ) {
                            label$ = time.lbl[4];
                        } else {
                            label$ = time.lbl[5];
                        }
                    }

                    ul.attr({ 
                        'aria-label' : label$ 
                    });
                };

                ui._renderItem = function ( ul, item ) {
                    var li      = $( '<li>' ),
                        wrapper = $( '<div>', { html : '<span class="' + clssMenuItemOption + pz + 'text">' + item.label + '</span>', class : clssMenuItemOption } ),
                        icon;
                    
                    val$ = item.value;
                    
                    if ( 'privacy' == purp$ ||  'gender' == purp$ || $soc$ == purp$ ) {
                        icon = '<span' + ahid + ' class="' + clssMenuItemOption + pz + 'icon';

                        if ( $soc$ == purp$ ) {
                            icon += ' mainsprite ' + val$;
                        } 
                    }

                    if ( 'privacy' == purp$ ) {
                        icon += ' dashicons dashicons-' + ( 1 == val$ ? 'admin-site' : 'lock' );
                    } else if ( 'gender' == purp$ ) {
                        if ( val$  ) {
                            icon += ' mainsprite ' + ( 'm' == val$ ? 'male' : 'female' );
                        }
                    } else if ( fneCntry == purp$ ) {
                        if ( ! item.value ) {
                            li.attr( 'style', 'display:none;' );
                        }

                        wrapper.prepend( describrPhones.htm.countryFlag( item.value, clssMenuItemOption + pz + 'flag' ) );
                    }

                    if ( icon ) {
                        icon += '"></span>';
                        wrapper.prepend( icon );
                    }                    
                    
                    return li.addClass( clssMenuItem ).append( wrapper ).appendTo( ul );
                }
            },
            open : function () {
                menuType = $( this ).data( 'purp' );
            },
            select : function ( event, ui ) {
                var parent, 
                    input$;
                
                elem   = $( this );
                parent = elem.parent();

                val$ = ui.item.value;
                
                if ( val$ ) {
                    if ( [ 'gender', 'privacy', 'status', 'timezone' ].includes( menuType ) ) {
                        input$ = elem.siblings( t );
                    }
                    
                    if ( fneCntry == menuType ) {
                        elem.data( 'countrycode', val$ );

                        parent.siblings( 'div' ).not( '.is-dismissible' ).each( function() {
                            var fnePart = $( this ).find( ptFndTxtBx ).removeAttr( 'disabled' ),
                                ext;
                            
                            //Ensure the extension's prefix for the selected country is specific.
                            if ( $ext == fnePart.getData( 'info' ) ) {
                                ext = libphonenumber.getExtPrefix( val$ ).trim();

                                if ( i18nGen[8] != 'extension' ) {
                                    ext = i18nGen[8];
                                }

                                fnePart.attr( 'placeholder',  ext );
                            }
                        });

                        //Is country selected appropriate for the phone number that might have already been typed?
                        //To find, we verify the country against this would-be number.
                        phoneNum.verifPhne( parent.parent(), val$, describrPhones );
                    } else if ( $soc$ == menuType ) {
                        if ( describrBio[menuType].html.select.types[val$] ) {
                            elem.data('curnet', val$ );

                            describrBio[menuType].global.update( parent );
                        }
                    } else if ( input$ ) {
                        input$.val( val$ );
                    }

                    if ( 'privacy' != menuType && 'date' != menuType ) {                     
                        removeOptionEmptyVal( elem );
                    }
                }
            },//select
            change : function ( event, ui ) {
                val$ = ui.item.value;
                elem = $( this );

                var data = elem[0].dataset,
                    arr1 = [],
                    pick = time.datePickr(),
                    clss = elem.attr( 'class' ).split( ' ' )[0],
                    part,
                    arr,
                    id,
                    oldDate,
                    newDate,
                    month,
                    day,
                    day1;

                clss = clss.slice( 0, clss.lastIndexOf( pz ) );

                if ( 'date' == menuType ) {
                    part = data.part;

                    id = elem.attr( 'id' );

                    submitInput = elem.siblings( t );              
                    
                    oldDate = submitInput.val();
                    
                    pick.note = data.activity;

                    pick.class = clss; 

                    arr = oldDate.split( '-' );
                    
                    arr1[0] = arr[0];
                    
                    if ( 'year' == part ) {
                        arr1[0] = val$;                        
                    } else if ( val$ ) {
                        if ( 'day' == part ) {
                            if ( arr[1] ) {
                                arr1[1] = arr[1];
                            } else {
                                arr1[1] = '01';
                            }
                        }

                        if ( 'month' == part ) {
                            arr1[1] = val$;
                        } else if ( 'day' == part ) {
                            arr1[2] = val$;
                        }
                    }               

                    newDate = arr1.join( '-' );

                    pick.date = arr1;
                    
                    if ( 'year' == part ) {
                        month = id.replace( 'year', 'month' );
                        day   = id.replace( 'year', 'day' );
                        $('#' + month).html(pick.month()).selectmenu( 'refresh' );
                    } else if ( 'month' == part ) {
                        day = id.replace( 'month', 'day' );
                    }
                    
                    if ( 'day' != part ) {
                        $('#' + day ).html(pick.day()).selectmenu( 'refresh' );
                    }

                    day1 = $( '#' + day + '-button' );
                    
                    if ( 'year' == part ) {
                        day1.hide();
                    } else if ( 'month' == part ) {
                        day1.show();
                    }                   

                    submitInput.val( newDate );
                }
            }//change
        });
    }//mnObj.selectmenu

    mnObj.jqueryAutocomplete = function() {
        var input$,//combobox
            submitInput,//Hidden input element containing extra data to be submitted.
            menu,//The menu that this combobox controls.
            info,
            val,
            elem,
            menu,
            results;
        
        function getMenu ( ui ) {
            return $( '#' + ui.attr( 'id' ) + '-select' );
        }

        function setMenuHieght ( input$ ) {
            var d      = .75,
                parent = input$.parent(),
                offset = parent.offset(),
                top    = offset.top + parent.outerHeight() + d,
                left   = offset.left - d,
                menu$  = getMenu( parent );

            if ( menu$.length ) {
                menu$.css( { top : top, left : left } );
            }
        }
        
        doc.find( '.' + plugin + pz + 'autocomplete' ).autocomplete({
            minLength : 1,
            delay : 750,
            autoFocus : !0,
            source : function ( request, response ) {
                var el = this,
                    restURL,
                    langs;

                elem        = $( el.element ).removeClass( 'ui-autocomplete-loading' );
                val         = request.term;
                info        = elem.data( 'info' );
                parent      = elem.parent();
                submitInput = parent.find( 'input[' + dpurp + '="submit"]' );
                results     = [];

                if ( 'partner' === info ) {
                    restURL = describr.resturl;
                    restURL += -1 === restURL.indexOf( '?' ) ? '?' : '&';
                    
                    $.ajax({
                        beforeSend : function( xhr ) {
                            xhr.setRequestHeader( 'X-WP-Nonce', describr.noncerest );
                        },
                        dataType : 'json',
                        url      : restURL + 'profile_user_id=' + describr.profile.profileUserId + '&search_term=' + encodeURIComponent( val ),
                        type     : 'GET'                    
                    }).done( function( resp ) {
                        resp = isJson( resp );
                        
                        Array.isArray( resp ) && resp.forEach( function( user ) {
                            val = user.name;

                            results[results.length] = itemInfo( info, val, val, user.id );
                        });
                    
                        response( results );
                    });//Ajax ends here.
                } else if ( 'langs' == info ) {
                    var j, 
                        k;

                    langs = describrLangs;
                    val   = val.toLowerCase();

                    for ( j in langs ) {
                        k = langs[j];

                        if ( 0 === k.toLowerCase().indexOf( val ) ) {
                            results[results.length] = itemInfo( info, k, k, j );
                        }
                    }

                    response( results );
                } else {//current city, hometown, lived city, or job location
                    response( userSrchCity( val ) );
                }
            },//source
            //Fires onblur and input value has changed
            //Here, we ensure that data in input of type hidden are related to the most recent entry in the combobox.
            change : function ( event, ui ) {
                var sameVal = !1;//By default, the combobox's value is different from those of the list items.
                
                input$ = $( this );
                val    = input$.val().trim();

                menu = doc.find( '#' + input$.attr( 'aria-controls' ) );                
                
                //Does a related menu exist?
                if ( menu.length &&  ( 'partner' == info || 'city' == info) ) {
                    //Iterate over the menu's list items, check if text are the same as that in the combobox, and set sameVal to true. 
                    menu.find( 'li' ).each( function () {
                        if ( $( this ).text() == val ) {
                            sameVal = !0;

                            return; 
                        }
                    });
                    
                    //If the combobox's value was not found among the list item's but extra data is set, remove this extra data, as both data are not related.
                    if ( ! sameVal && submitInput.val() ) {
                        submitInput.val('');
                    }
                }
            },
            close : function () {
                $( this ).ariaEx( !1 );
            },//close: This event is triggered whenever the autocomplete menu closes
            open() {
                elem = $( this ).ariaEx( !0 );

                if ( 'langs' == info ) {
                    setMenuHieght( elem );
                }
            },//open: //This event is triggered after the data has been readied and the menu is about to open.
            focus : function( event, ui ) {
                var activeClass = 'ui-state-active', 
                    li          = 'li', 
                    li1;
                
                if ( 'langs' == info ) {
                    setMenuHieght( $( this ) );
                }

                if ( event ) {
                    menu = $( event.currentTarget );
                    li1  = menu.find( li ).eq(0);
                    
                    //Prevent default behavior of updating combobox's value with the value of the focused item.
                    if ( 'partner' != info ) {
                        event.preventDefault();
                    }
                    
                    if ( li1.length ) {
                        $( li, menu )
                        .removeClass( activeClass )
                        .filter( function() {
                            return $( this ).text() === ui.item.label;
                        }).addClass( activeClass );
                    }

                    if ( 'partner' == info ) { 
                        if ( submitInput.length ) {
                            submitInput.val('');//Remove old value
                        
                            //new value?
                            if ( ui && ui.item.extra ) {
                                submitInput.val( ui.item.extra );//Set new value.
                            }
                        }                 
                    } 
                }
            },
            select : function ( event, ui ) {
                var item,
                    submitVal,
                    type,
                    langCode,
                    verifLang,
                    describrLang,
                    grid;
                
                if ( ui && ui.item ) {
                    item = ui.item;
                    type = item.type;
                    
                    if ( item.extra ) {
                        if ( 'langs' == type ) {
                            event.preventDefault();

                            langCode = item.extra;

                            //Verify that the language has not already been selected.
                            if ( ! describrLangsArr.includes( langCode ) ) {
                                describrLang = describrBio[type]

                                verifLang = describrLang.getLang( langCode );

                                if ( verifLang ) {
                                    describrLangsArr.push( langCode  );//Add the code to the language-code array.

                                    val = submitInput.val();//Get the already stored language codes.
                                    
                                    $( this ).val('');//Empty the text box that was used to search for the language.
                                    
                                    //If language codes already exist, append the new code separating it from the old ones with a comma, else set the first code. 
                                    submitVal = val ? ( val + ',' + langCode ) : langCode;
                                    
                                    //Languages are shown to the user in grid format, so we attach the new gridcell, the language's second closest container, to an existing grid, or create a new grid.
                                    grid = parent.find( 'span[role="grid"]' );
                                        
                                    if ( grid.length ) {
                                        grid.find( 'span[role="row"]' ).append( describrLang.gridcell( langCode ) );
                                    } else {
                                        parent.prepend( describrLang.grid( langCode ) );
                                    }

                                    describrLang.jsUpdate();   
                                }
                            }
                        } else {
                            submitVal = item.extra;
                        }
                    } else {
                        submitVal = item.value;
                    }
                    
                    if ( submitInput.length && submitVal ) {
                        submitInput.val( submitVal );
                    }
                }    
            },//select
            create : function () {
                input$ = $( this );
                parent = input$.parent();
                    
                var class1 = parent.attr( 'class' ).split( ' ' )[0],
                    ctrls$ = input$.attr( 'aria-controls' ),
                    ui     = input$.data( 'ui-autocomplete' ),
                    opt    = 'option',
                    str    = 'select';
                
                ui._renderMenu = function ( ul, items ) {
                    var that   = this,
                        label  = '',
                        items1 = '';
                    
                    if ( 'partner' == info ) {
                        label = i18nChoose[6];
                    } else if ( 'langs' == info ) {
                        label = i18nChoose[7];
                    } else {
                        label = i18nChoose[8];
                    }
                                          
                    $.each( items, function( index, item ) {
                        that._renderItemData( ul, item );
                    });
                    
                    ul.addClass( class1 + pz + str );
                    
                    ul.attr({ 
                        id           : ctrls$, 
                        role         : 'listbox', 
                        'aria-label' : label 
                    });
                };

                ui._renderItem = function ( ul, item ) {
                    return $( '<li>' )
                        .attr( { role : opt, tabindex : -1 } )
                        .addClass( class1 + pz + str + pz + opt + ' ui-menu-item' )
                        .append( item.label )
                        .appendTo( ul );
                }

                ui._resizeMenu = function () {
                    this.menu.element.css( 'min-width', parent.outerWidth() );
                }
            }
        }).on( 'focus', function () {
            var self = $( this ),
                menu = getMenu( self.parent() );
            
            if ( self.val().length && menu.length && menu.html().length ) {
                menu.show();
            } else {
                self.keydown();
            }
        });
    }//jqueryAutocomplete

    mnObj.notices           = notices;
    mnObj.tzRemoveContinent = tzRemoveContinent;

    $.fn.focusToEnd = function() {
        return this.each( function( m, k ) {
            var k = $( this ),
                v = $.trim( k.val() );

            //Add space if value doesn't end with space.
            if( v.charAt( v.length-1 ) != ' ' ){
                v += ' ';
            }

            k.focus().val( '' ).val( v );
        });
    }
    /**
     * Sets attribute aria-expanded's value.
     * 
     * @param bool e Attribute's value to set.
     */
    $.fn.ariaEx = function( e ) {
        return this.each( function() {
            var k = $( this );
            if ( 'undefined' ==  typeof e ) {
                k.attr( 'aria-expanded', function( i, attr ) {
                    return 'false' == attr ? 'true' : 'false';
                });
            } else {
                k.attr( 'aria-expanded', e );
            }
        });
    }    
    /**
     * Fetches the data attribute with jquery's attr method.
     * 
     * Both attr and data methods can be used to fecth the data attr; however,
     * attr updates the DOM while data doesn't. As a result, this method aims to 
     * provide some sort of consistency.
     */
    $.fn.getData = function( attr ) {
        var arr = this.attr( 'data-' + attr );

        if ( arr ) {
            arr = isJson( arr );
        }

        return arr;
    }

    return mnObj;
        },    
        doc              = $( document ),
        PTGLR            = mainDescribr( $, window ),
        click            = PTGLR.click, 
        pc               = PTGLR.pc, 
        time             = PTGLR.time, 
        fileApiSupported = PTGLR.fileApiSupported, 
        class2Id         = PTGLR.class2Id,
        select           = PTGLR.select, 
        icons            = PTGLR.icons, 
        restrictAccess   = PTGLR.restrictAccess, 
        int              = PTGLR.int,
        sprintf          = wp.i18n.sprintf,
        i18nPhldr        = i18n.placeholders,
        i18nSctns        = i18n.labels.sections,
        i18nSctnsEvent   = i18n.labels.section_events,
        i18nHighSch      = i18n.schools.highschool,
        i18nCollege      = i18n.schools.college,
        i18nContact      = i18n.contact,
        i18nPhones       = i18nContact.phones,
        i18nEmail        = i18nContact.email,
        i18nRel          = i18n.relationship,
        datePickr        = time.datePickr(),
        sanitizeAddr     = PTGLR.sanitizeAddr,
        attrCbx          = PTGLR.attrCBx,
        subsctn          = PTGLR.subsctn,
        cmpDates         = PTGLR.cmpDates,
        newObj           = PTGLR.newObj,
        limitChars       = PTGLR.limitChars,
        notices          = PTGLR.notices,
        defTxtBx         = PTGLR.txtBx,
        html             = PTGLR.html,
        displayCity      = PTGLR.displayCity,
        PTPN             = PTGLR.phoneNumber,
        dsbld            = icons.dsbld,
        prvcy            = icons.prvcy,
        sh               = 'show',
        priv             = 'visibility',
        appr             = 'approved',
        tbindx           = ' tabindex="0"',
        eventMenus       = [],
        cantEditRel      = '',
        keywrds          = '',
        results          = '',
        listBox          = '',
        inputBoxParent   = '',
        $status          = 'status',
        $lang            = 'langs',
        $prtnr           = 'partner',
        $since           = 'since',
        bdge             = 'badge',
        gndr             = 'gender',
        bDate            = 'birthdate',
        bio              = 'bio',
        tgl              = 'tagline',
        tz               = 'timezone',
        pub              = 'published',
        wb               = 'websites',
        wrk              = 'workhistory',
        edu              = 'edu',
        priv1            = 'privacy',
        edus             = {},
        $ava             = 'avatar',
        $rel             = 'relationship',
        acc              = pz + 'accessibility',
        sb1              = 'submit',
        fne              = 'phones',//phones
        eml              = 'email',
        cntc             = 'contact',
        addr             = 'addresses',
        rootId           = plugin,
        $inputAuto       = pz + 'input ' + plugin + pz + 'autocomplete',
        $selectmenu      = plugin + pz + 'selectmenu',
        selectmenu       = ' ' + $selectmenu,
        lCty             = 'lived_cities',
        rootClsAddr      = plugin + pz + addr,
        rootLivedCities  = rootClsAddr + pz + lCty + pz + sh,
        nameAttrAddr     = plugin + '[' + addr + ']',
        rootCntnr        = $( '#' + plugin ),
        highLight        = plugin + pz + 'highlight',
        avaId            = '#' + plugin +'-avatar-',     
        isEditor         = Object.hasOwn( describr, 'isEditor' ) ? xToBool( describr.isEditor ) : flg,
        curUser          = Object.hasOwn( describr, 'curUser' ) ? describr.curUser : 0,//ID of the log-in user
        ptUser           = describr.profile ? sanitize( describr.profile ) : {},//User profile object
        isPub            = Object.hasOwn( ptUser, pub ) ? xToBool( ptUser[pub] ) : $tru,
        isOwnProf        = Object.hasOwn( ptUser, 'isOwnProfile' ) ? xToBool( ptUser.isOwnProfile ): flg,//ID for owner of profile 
        userName         = ptUser.displayName || '',//Name of the profile owner
        theAvatar        = ptUser.userImage || '',
        avatarSpecs      = describr.avatar || {},
        labels           = { 
            langs   : i18nSctns[12], 
            cntry   : i18nGen[4], 
            contact : i18nSctns[13], 
            fNum    : i18nGen[5], 
            again   : ' ' + i18nGen[6], 
            rm      : i18nGen[7], 
            ext     : i18nGen[8], 
            gndr1   : i18nChoose[2]},
        editors         = {},
        ctrls           = {},
        bi              = {},
        rel             = {},
        edit            = {},//Some sections' data are stored in this object as they edited so that cross-referencing can occur.
        btnGen          = icons.btnGen,
        clrTxt          = icons.clrTxt,
        dinfo           = 'data-info',
        actrl           = 'aria-controls',
        albl            = 'aria-label',
        phldr           = 'placeholder',
        chkbx           = 'checkbox',
        dp              = 'display',
        pubStatusIcon   = plugin + pz + 'publish' + pz + $status + pz + 'icon',
        getSubmitInput  = 'input[' + dpurp + '="' + sb1 + '"]',
        $from           = newObj( datePickr ),
        $to             = newObj( datePickr ),
        $descr          = newObj( limitChars ),
        $to$            = i18nGen[9],
        $by             = i18nGen[10],
        $from$          = i18nGen[11],
        $with           = i18nGen[12],
        timeTrigger,
        nameAttr,
        lbl1,
        len,
        i,
        val,
        fileSpecs,        
        avatarUpdating   = flg,   
        avatarUpload,
        avatarRemove,
        avatarContainer, 
        avatarForm,
        avatarFormButton,
        avatarTitle,
        avatarButtonTxt,
        avatarSelected   = '',
        avatarFrame, 
        avatarDelete, 
        avatarDeleteCheck;
    
    //additional labels
    labels[$ava]  = i18nSctns[1];
    labels[fne]   = i18nSctns[14];
    labels[tgl]   = i18nSctns[2];
    labels[bdge]  = i18nSctns[3];
    labels[gndr]  = i18nSctns[4]; 
    labels[bDate] = i18nSctns[5];
    labels[bio]   = i18nSctns[6];
    labels[eml]   = i18nSctns[15];
    labels[tz]    = i18nSctns[16];
    labels[pub]   = i18nSctns[0];
    labels[$soc$]   = i18nSctns[17];
    labels[$soc$+0] = i18nGen[36];
    labels[$soc$+1] = i18nGen[37];
    labels[wb]    = i18nSctns[18];
    labels[wb+0]  = i18nGen[38];
    labels[wrk]   = i18nSctns[19];
    labels[$rel]  = i18nSctns[11];
    labels[addr]  = i18nSctns[7];
    labels.hometown = i18nSctns[8];
    labels.current_city = i18nSctns[9];
    labels[lCty] = i18nSctns[10];

    edus[edu] = i18nSctns[20];
    edus.colleges = { 
        lbl : i18nSctns[21],
        exp : i18nCollege[5],
        editorsLbls : {
            btn : sprintf(
                i18nSctnsEvent[0],
                userName
            ),
            menu : sprintf(
                i18nSctnsEvent[1],
                userName
            )
        } 
    };
    edus.highschools = { 
        lbl : i18nSctns[22],
        exp : i18nHighSch[2],
        editorsLbls : {
            btn : sprintf(
                i18nSctnsEvent[2],
                userName
            ),
            menu : sprintf(
                i18nSctnsEvent[3],
                userName
            )
        } 
    };

    $from.init = function ( i, from ) {
        var u     = this,
            t     = 'from',  
            clss1 = u.clss,
            id1   = class2Id( clss1 ) + '-' + i,
            sub   = u.sub,
            htm   = '';
        
        u.clss = clss1;
        
        if ( ! from ) {
            from = '';
        }
            
        htm += time.setupDate({
            class    : clss1,
            id       : id1,
            date     : from,
            nameAttr : u.nameAttr + '[' + i + '][' + t + ']',
            sctn     : sub + t
        });

        return html.el( htm, { class : clss1, id : id1 } );
    }//u.from.init

    $to.init = function ( i, to ) {
        var u     = this,
            t     = 'to', 
            clss1 = u.clss,
            id1   = class2Id( clss1 ) + '-' + i,
            sub   = u.sub,
            htm   = html.el( i18nGen[9], { class : clss1 + pz + 'label' }, 'span' );
            
        u.clss = clss1;
            
        if ( ! to ) {
            to = u.startYr();
        }
        
        htm += time.setupDate({
            class    : clss1,
            id       : id1,
            date     : to,
            nameAttr : u.nameAttr + '[' + i + '][' + t + ']',
            sctn     : sub + t,
            to       : !0,
            future   : u.future
        });

        return html.el( htm, { class : clss1, id : id1 } );
    };//u.to.init 
    
    //Events start here.
    doc.ready( function( d ) {
        doc.on( click, 'button[type="button"]', function( e ) {
            if ( ! pc( e ) ) {
                return;
            }

            var btn     = $( this ), 
                clss1   = btn.prop( 'class' ),
                id1     = btn.prop( 'id' ),
                purp    = btn.getData( 'purp' ),
                ctrls1  = btn.attr( actrl ),
                btnPrnt = btn.parent(),
                cities,
                txtBx,
                menu;

            if ( plugin !== btn.getData( 'plugin' ) ) {
                purp == '';
            }

            //Is the user trying to remove an error message?
            if ( 'dismisserror' === purp ) {
                btn.closest( 'div' ).remove();
            } else if ( 'clear' === purp ) {//Is the user trying to clear the text box?
                txtBx = btn.siblings( ptFndTxtBx );

                txtBx.val( '' );

                btn.siblings( getSubmitInput ).val( '' );

                btn.hide();//Hide button
            } else if ( 'removelang' === purp ) {
                var langCode = btn.getData( 'langcode' ),//The code of the language to remove
                    grid     = btn.closest( 'span[role="grid"]' ),//The entire grid
                    input    = grid.parent().find( getSubmitInput ),//The input that submits languages.
                    val      = '',
                    arr      = [];//The array with updated language codes
                
                //Language codes are updated by iterating over the array containing old codes and storing them, except the code being deleted, in the array containing updated ones.
                //describrLangsArr variable is documented in global-vars.js.
                describrLangsArr.forEach( function( langCode1 ) {
                    //Push all codes, except the code being deleted, in the array containing updated codes.
                    if ( langCode != langCode1 ) {
                        arr.push( langCode1 );
                    }
                });
                
                describrLangsArr = arr;

                if ( arr.length ) {//After removing the code in question, are there any remaining codes?
                    btnPrnt.remove();//Remove the visible language, whose grandparent is the parent of the delete button.
                    
                    val = arr.join( ',' );//The server-bounded codes are updated, excluding the deleted code.
                    
                    bi.langs.jsUpdate();//Reset the data-row and data-column order.
                } else {
                    grid.remove();//Remove the grid since there are no languages remaining.
                }
                
                input.val( val );//Update the input value.
            } else if ( 'editphone' === purp ) { //Is the user attempting to edit a phone number?
                //Locate the wrapper for the phone number's parts.
                doc.find( '.' + btnPrnt.parent().attr( 'class' ) + '[data-phonenumeditable="1"]' ).each( function () {
                    var phonePartsWrppr  = $( this ), selectCountryId;

                    phonePartsWrppr.replaceWith( bi.contact.phones.htm.init( phonePartsWrppr.data( 'phonenumberold' ), 1 ) );//Replace the phone parts' wrapper used to display the phone number with the wrapper used to edit the phone number.
                    
                    selectCountryId = '#' + bi.contact.phones.htm.selectId;

                    //Add the phone number's country's select element selectmenu.
                    doc.find( selectCountryId ).length && PTGLR.selectmenu( selectCountryId );
                });
            }//else if ( 'editphone' == purp ) {
                
            //Does the user want to view or remove the menu of editors of a section?
            if ( /events/.test( clss1 ) && ( new RegExp( plugin ) ).test( clss1 ) ) {
                menu = $( '#' + ctrls1 );
                
                //Removes the dropdown if it exists.
                if ( menu.length ) {
                    menu.remove();
                    btn.ariaEx();
                } else {
                    //Stores the ID so that the menu can be removed if the user click on something else that is unrelated.
                    if ( ! eventMenus.includes( ctrls1 ) ) {
                        eventMenus.push( ctrls1 );
                    }
                    
                    btnPrnt.append( editors.menu( btn ) );

                    btn.ariaEx( !0 );
                }
            }//if ( /events/.test( clss1 ) ) 
        });//button[type="button"]
            
        doc.on( click, function( e ) {
            var target = $( e.target ),
                el;
            
            //Did the user click the publish-status icon of a section? If yes, toggle the related checkbox.
            if ( target.hasClass( pubStatusIcon ) ) {
                el = target.prev()[0];
                el.checked = el.checked ? !1 : !0;
            }   
                        
            //Removes drop-down menus and listboxes if click is outside the scope of that dropdown. 
            eventMenus.length && eventMenus.forEach( function( $id ) {
                var dropDown       = doc.find( '#' + $id ),
                    dropDownTriggr = dropDown.siblings( 'button' );
                
                //Removes the drop-down if it is visible, and neither it nor its trigger was clicked.
                if ( dropDown.length && ! target.closest( dropDown ).length &&  ! target.closest( dropDownTriggr ).length ) {
                   dropDown.remove();
                   dropDownTriggr.ariaEx();
                }
            });
        });
        
        doc.on( 'keyup', ptFndTxtBx,  function() {
            var el   = $( this ),
                info = el.data( 'info' );

            if ( ! info ) return;   
            //Ensure that only numbers are typed in the phone extension's text box.
            if ( $ext == info ) {
                var extVal = el.val();

                extVal && el.val( extVal.replace( /[^0-9]*/g, '' ) );
            }
        });//keyup
        
        doc.on( 'keyup focus blur paste', 'textarea, input', function( e ) {
            var el   = $( this ),
                val  = el.val(),
                data = el.data(),
                type = e.type,
                lmt,
                prnt,
                len,
                w,
                classCurLen,
                classCurLenReached;
            
            if ( data.plugin && plugin === data.plugin ) {
                if ( data.purp ) {
                    data = data.purp;
                } else if ( data.info ) {
                    data = data.info;
                }
            }

            if ( $soc$ == data ) {//social networks
                if ( 'keyup' == type ) {
                    //Remove invalid characters from the handle.
                    '' != val && el.val( val.replace( bi[$soc$].global.regXHandle, '' ) );
                } else if ( 'blur' == type || 'focusout' == type ) {
                    //Update the submitted value, if necessary.
                    bi[$soc$].global.update( el.parent() );
                }
            } else if ( wb == data ) {//website address
                if ( 'blur' == type || 'focusout' == type ) {
                    bi[wb].validate( el );
                }
            }

            //This plugin's textareas.
            if ( 'bio' == data || tgl == data || wrk == data || edus[data] ) {
                if ( 'bio' == data ) {//bio
                    w = bi.basicInfo.bio;
                } else if ( tgl == data ) {//tagline
                    w = bi[data];
                } else if ( edus[data]  ) {//colleges or high schools
                    w = bi[edu][data].descrptn
                } else {
                    w = bi[data].descrptn;//job description
                }

                classCurLen        = w.classCurLen;//class for the limit indicator's element
                classCurLenReached = w.classCurLenReached;//class to change to red the color of limit indicator's element 
                
                val  = el.val();//text currenly in the textarea
                prnt = el.parent();//textarea's container
                lmt  = prnt.find( '.' + w.classCurLen )//limit indicator's element
                       .removeClass( classCurLenReached )//Remove the class that changes the limit indicator to red, if present.
                       .text( w.getLen( val ) );//Display the number of characters currently inside of the textarea.

                if ( w.isMxLen( val ) ) {//Has the limit been reached?
                    lmt.addClass( classCurLenReached );//Change to red the color of the limit indicator.
                }

                el.val( w.trunc( val ) );//Update the text in the textarea, truncated if necessary.
                
                //Screen readers are only notified if the number of characters has changed: val.length != w.curLen.
                val.length != w.curLen && prnt.find( w.classAcc ).text( w.access( val ) );

                w.curLen = val.length;//Update the characters' length.
            }
        });

        doc.on( 'keydown', function( event ) {
            //Is there a grid element for languages on the page?
            if ( bi.langs.gridClass ) {
                //Was the grid element for languages the target of the keydown event? 
                if ( $( event.target ).closest( '.' + bi.langs.gridClass ).length ) {
                    bi.langs.jsEvent( event );//Call the method responsible for handling keydown event for languages.
                }
            }
            
            //Remove  all errors' notices.
            doc.find( 'button[data-action="' + plugin + 'dismisserror"]' ).closest( 'div' ).remove();
        });//keydown

        doc.on( 'blur', ptFndTxtBx, function() {
            var input  = $( this ),
                input1 = input.siblings( 'input[type="' + hid +'"]' ),
                data   = input[0].dataset,
                val    = input.val().trim(),
                info;
            
            if ( data.plugin && plugin === data.plugin && data.info ) {
                info = data.info;
                if ( $fne == info || $ext == info ) PTPN.verifPhne( input.parent().parent(), val, bi[cntc][fne] );
                else if ( eml == info ) PTGLR.verifEmail( input, bi.contact.email );
                else if ( ( ptLocs.includes( info ) || wrk == info) && val != input1.val() ) input1.val( '' );
            }//info
        });//Blur

        doc.on( 'change', 'input[data-purp="' + plugin + 'togglewrktimeperiodtochckbx"]', function() {
            var el          = $( this ),
                $chckd      = el.prop( 'checked' ),
                $id         = el.data( 'id' ),
                $ctrls      = '#' + el.attr( actrl ),
                $el         = doc.find( $ctrls ),
                selectMenus = $ctrls + ' .' + $selectmenu;

            if ( $chckd ) {
                $el.remove();
            } else {
                !$el.length && doc.find( $ctrls.replace( '-to-', '-from-' ) ).after( bi[wrk].to.init( $id ) ) && doc.find( selectMenus ).length && PTGLR.selectmenu( selectMenus );
            }
        });//change

        PTGLR.selectmenu();
        PTGLR.jqueryAutocomplete();//Attach jquery's autocomplete method to the relevant text boxes. 
    });//$(document).ready
    
    function avatarUpdate( update ) {
        $tru === update 
        ? (( avatarUpdating = $tru ),
          avatarFormButton.prop('disabled',$tru ))
        : (( avatarUpdating = flg ),
          avatarFormButton.prop('disabled', flg ));
    }

    function avatarRemover() {
        if ( avatarUpdating ) {
            return;
        }
        
        avatarUpdate( $tru );
        
        $.ajax(
            {
                type     : 'POST',
                url      : describr.ajaxurl,
                dataType : 'html',
                data     : {
                    action: plugin + '-remove-avatar', 
                    user_id: avatarSpecs.userId, 
                    _wpnonce: avatarSpecs.deleteNonce
                }
            } 
        ).done( function( img ) {
            avatarContainer.data( 'id', '' );   
            avatarContainer.html( DOMPurify.sanitize( img ) );
            avatarRemove.addClass( hid ).attr( 'tabindex', -1 );
            avatarUpdate( flg );
        });
    }

    function avatarLoad() {
        avatarUpload.on( 'change', function() {
            var error = avatarValidate();
            
            if ( error ){
                $( avaId + 'notices' ).append( error );
            }
        });

        avatarForm.on( sb1, function( e ) {
            var error = avatarValidate();
            
            if ( error ) {
                $( this ).prepend( error );
                e.preventDefault();
                return flg;
            }
        });

        doc.on( click, '.describr__avatar__edit', function( e ) {
            if ( ! pc( e ) ) {
                return;
            }

            e.stopPropagation();

            //If the media frame already exists, reopen it.
            if ( avatarFrame ) {
                avatarFrame.open();
                return
            }

            //Initialize media library modal
            avatarFrame = wp.media({
                title   : avatarTitle,
                button  : { text: avatarButtonTxt },
                library : { type : 'image' },
                multiple: flg
            });
            
            avatarFrame.on( 'select', function() {
                avatarUpdate( $tru );//We set multiple to false so only get one image from the uploader

                var avatarId = parseInt( avatarFrame.state().get( 'selection' ).first().toJSON().id );

                $.ajax({
                    type     : 'POST',
                    url      : describr.ajaxurl,
                    dataType : 'html',
                    data : { 
                        action  : plugin + '-assign-avatar', 
                        media_id: avatarId, 
                        user_id : avatarSpecs.userId, 
                        _wpnonce: avatarSpecs.updateNonce 
                    }
               }).done( function( img ) {
                    avatarContainer.data( 'id', avatarId );
                    avatarContainer.html( DOMPurify.sanitize( img ) );
                    avatarRemove.removeClass( hid ).attr( 'tabindex', 0 );
                    avatarUpdate( flg );
                });
            });
            
            //Check whether the WordPress' media library's dialog box is closed, and delete Avatar from Describr if the image is no longer in media library.
            avatarFrame.on( 'close', function() {
                var avatarId     = avatarContainer.data('id'),//The image wrapper's data-id attribute has the post id for the Avatar.
                    avatarExists = !1;//By default, the Avatar doesn't exist.
                
                //Is there an existing Avatar for the user in Describr?
                if ( avatarId ) {
                    //Get the attachments in media library, and check if any one of them has a post id matching the id of the user's existing Avatar. If a match doesn't exist, remove the Avatar from Describr.
                    doc.find('.media-modal .attachment').each( function () {
                        if ( $( this ).data( 'id' ) == avatarId ) {
                            avatarExists = !0;

                            return !1;
                        }
                    });
                    
                    if ( ! avatarExists ) {
                        avatarRemove.trigger( 'click' );
                    }
                }
            });
                        
            avatarFrame.open();
        });

        avatarRemove.on( click, function( e ) {
            if ( ! pc( e ) ) {
                return;
            }

            e.stopPropagation();

            avatarRemover();
        });

        avatarForm.on( click, function( e ) {
            if ( ! pc( e ) ) {
                return;
            }
            
            if ( $( e.target ).closest( '.notice-dismiss' ) ) {
                $( e.target ).closest( '.notice' ).remove();
            }
        });   
    }

    function avatarValidate() {
        //Don't bother validating file if file api is not supported
        if ( fileApiSupported ) {
            var file = avatarUpload.length ? avatarUpload[0].files : [];
 
            if ( ! file.length ) {
                return flg;
            }
            
            file = file[0];
        } else {
            return flg;//No errors found
        }
        
        var error = '',
            name  = String( file.name ),
            ext   = name.split( '.' ).pop();
        
        if ( ! fileSpecs.types.includes( ext.toLowerCase() ) ) {
            error = sprintf(
                i18nPhldr[2],
                name,
                fileSpecs.types.join( ', ' )
            );
        } else if ( parseInt( fileSpecs.sizeLimit ) < file.size ) {
            error = sprintf(
                i18nPhldr[3],
                name,
                fileSpecs.sizeFormat
            );
        }

        if ( error ) {
            error = notices( 'error', sanitizeTxt( error ) );
        }
        
        return error;
    }
   
    /**
     * Attaches privacy html combobox.
     * 
     * The privacy object was set @ the top of the page.
     * 
     * @param string vis_      The previously selected privacy status.
     * @param string clss_     The class for the combobox.
     * @param string nameAttr_ The name attribute for the input element associated with the privacy. The value selected from the combobox's listbox will be placed here.
     * @param string ctrls_    The for the element that the combobox controls.
     * @param string lbl_      The label for the combobox.
     * @return string The privacy combobox.
     */
    function privacyInit( vis_, clss_, nameAttr_, ctrls_, lbl_, sctn_ ) {
        prvcy.clss  = clss_;
        prvcy.name  = nameAttr_;
        prvcy.ctrls = ctrls_;
        prvcy.label = lbl_;
        
        return prvcy.init( vis_ );
    }

    bi.init = function( userProfileWrapper ) {
        var u            = this,
            err          = !1,
            notifyUser   = '',
            profileSctns = '',
            notifyClass  = '.' + plugin;
        
        if ( theAvatar ) {
            profileSctns += u[pub]();
            profileSctns += u[$ava].init();
            profileSctns += u[tgl].init1();
            profileSctns += u.basicInfo.init();
            profileSctns += u[addr].init();
            profileSctns += u[$rel].init();
            profileSctns += u[$lang].init();
            profileSctns += u.contact.init();
            profileSctns += u[tz].init();
            profileSctns += u[$soc$].init();
            profileSctns += u[wb].init();
            profileSctns += u[wrk].init();
            profileSctns += u[edu].init();

            notifyUser = u.notifyUser();
        } else {
            profileSctns += notices( 'error', i18nGen[17] );

            err = !0;
        }
        
        if ( userProfileWrapper ) {
            doc.find( userProfileWrapper ).html( profileSctns );
        } else {
            rootCntnr.find( notifyClass + pz + 'loading' ).remove().end().append( profileSctns );
        }

        /*Add the log-in indicator. It is added to the Avator's section, so we have to wait after the Avatar's section is added, and then use jquery to prepend the log-in icon.*/
        u.loginNotice();
        
        if ( ! err ) {
            if ( avatarSpecs.fileSpecs ) {
                fileSpecs        = avatarSpecs.fileSpecs;
                avatarUpload     = doc.find( avaId + 'upload' );
                avatarRemove     = doc.find( avaId + 'remove' );
                avatarContainer  = doc.find( avaId + 'picture' ); 
                avatarForm       = avatarContainer.closest( 'form' );
                avatarFormButton = avatarForm.find( 'input[type="submit"]' );
                avatarTitle      = i18nChoose[0];
                avatarButtonTxt  = i18nGen[3];

                avatarLoad();
            }

            if ( canEdit ) {
                u.langs.jsUpdate();
            }
        }

        if ( notifyUser ) {
            rootCntnr.find( notifyClass + acc ).text( notifyUser );
        }
    }//init

    //The methods that deal the previewing and showing the list of editors of avatar, current city, and hometown starts here. The same thing done for lived cities are addressed in the prevCities constructors. 
            
    /**
     * Creates a preview of all editing of a profile section.
     * 
     * @param string key Profile section in question.
     */
    editors.init = function( key, clss_ ) {
        var u    = this,
            logs = u.getEditors( key ),
            htm  = '', 
            log, 
            editor,
            ctrlClss,
            htmClss,
            htmID;
                
        if ( logs ) {
            log    = logs[0];
            editor = log['name'];
            
            if ( clss_ ) {
                ctrlClss = clss_
            } else {
                ctrlClss = u.wrap( key, !0 );
                           
                ctrlClss += pz + 'ctrls';
            }
            
            htmClss =  ctrlClss + pz + 'events';

            htm = '<div class="' + htmClss + '"';

            htm += '>' + i18nGen[47] + ' <span class="';

            htm += htmClss;

            htm += pz + 'date">'; 

            htm += log['date'];

            htm += '</span> ' + i18nGen[10] + ' ';
            
            htmClss += pz + 'wrapper';
            
            htmID = class2Id( htmClss );
            
            htm += '<div class="' + htmClss + '">';
            
            htm += btnGen({
                'aria-label'     : u.lbl( key ),
                'aria-haspopup'  : 'menu',
                'aria-controls'  : htmID + '-menu',
                'data-viewevent' : key,
                'aria-expanded'  : flg,
                id               : htmID + '-button',
                class            : htmClss + pz + 'button',
                txt              :  '<span class="' + htmClss + pz + 'button' + pz + 'txt">' + editor + '</span><span' + ahid +' class="' + htmClss + pz + 'button' + pz + 'arrow_down dashicons dashicons-arrow-down"></span>'
            });

            htm += '</div></div>';
        }

        return htm;                
    };
            
    /**
     * Creates an HTML menu of editors for a profile section
     * 
     * @param jquery object Button that was clicked
     * @return string Menu of editors for a section
     */
    editors.menu = function( btn ) {
        var u         = this,
            sctn      = btn.data( 'viewevent' ),  
            logs      = u.getEditors( sctn ),
            len       = logs.length,
            numLogs   = 0,
            clss      = btn.parent().attr( 'class' ) + pz + 'menu',
            wrpprClss = clss + pz + 'wrapper',
            ItemClss  = wrpprClss + pz + 'item',
            htm       = '<div role="menu"' + tbindx + ' aria-label="';

        htm += u.lbl( sctn, !0 );
        htm += '" class="';
        htm += clss;
        htm += '" id="'
        htm += class2Id( clss );
        htm += '">'
        htm += '<span' + ahid +' class="' + clss + pz + 'arrow_up"></span><div class="' + wrpprClss + '">';
                         
        while( numLogs < len ) {
            var log      = logs[numLogs],
                editorId = log.id,
                path     = ( editorId == curUser ? 'profile.php' : 'user-edit.php?user_id=' + parseInt( editorId ) ); 
                            
            htm += '<div role="menuitem" class="' + ItemClss + '"><a class="' + ItemClss + pz + 'link" href="' + describr.adminurl + path + '" targt="_blank">' + log.date + ' ' + i18nGen[10] + ' <strong>' + log.name + '</strong></a></div>';

            numLogs++;
        }

        htm += '</div></div>';

        return htm;
    };
            
    /**
     * Creates the html class for the specific profile section.
     * 
     * @param string key The profile section in question.
     * @param bool Whether to add the specific section to the class.
     * @return string The class. 
    */
    editors.wrap = function( key, add ) {
        var t = plugin + pz;

        if ( bdge == key || gndr == key || bDate == key ) {
            t += 'basic_info' + pz;
        }
                       
        //Should the section be added to the class?
        if ( add ) {
            t += key;
                    
            if ( 'avatar' != key ) {
                t += pz + sh;
            }
        }
               
        return t;
    };
            
    /**
     * Fetches the editors for a particular profile section.
     *
     * @param string key Specific section for which editors will be fetched.
     * @return array | string Editors, empty otherwise.
     */
    editors.getEditors = function( key ) {
        var logs = '', 
            t    = 'updated_by';

        if ( fne == key || 'email' == key ) {
            if ( ptUser[cntc] && ptUser[cntc][key] && ptUser[cntc][key][t] ) {
                logs = ptUser[cntc][key][t];
            }
        } else if ( ptUser[key] && ptUser[key][t] ) {
            logs = ptUser[key][t];
        }

        return logs;
    };

    /**
     * Creates labels for both the button (labels starts with "View") that is used to display the editors and the menu containing the editors
     *  
     * @param string key  The section for which the labels belong.
     * @param bool   menu Whether a label should be create for button or menu.
     * @return string The label or empty string.
     */
    editors.lbl = function( key, menu ) {
        var lbl = '';
            
        if ( 'avatar' == key ) {
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[4],
                    userName
                );
            } else {
            lbl = sprintf(
                    i18nSctnsEvent[5],
                    userName
                );
            }
                    
        }  else if ( addr == key ) {
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[6],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[7],
                    userName
                );
            }
        } else if ( fne == key ) {
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[8],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[9],
                    userName
                );
            }
        } else if ( 'email' == key ) {
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[10],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[11],
                    userName
                );
            }
        } else if ( bdge == key ) {//name
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[12],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[13],
                    userName
                );
            }
        } else if ( gndr == key ) {//gender
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[14],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[15],
                    userName
                );
            }
        } else if ( bDate == key ) {//birthdate
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[16],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[17],
                    userName
                );
            }
        } else if ( bio == key ) {//bio
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[18],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[19],
                    userName
                );
            }
        } else if ( tz == key ) {//time zone
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[20],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[21],
                    userName
                );
            }
        } else if ( $soc$ == key ) {//social networks
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[22],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[23],
                    userName
                );
            }
        } else if ( wb == key ) {//websites
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[24],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[25],
                    userName
                );
            }
        } else if ( wrk == key ) {//work
            if ( menu ) {
                lbl = sprintf(
                    i18nSctnsEvent[26],
                    userName
                );
            } else {
                lbl = sprintf(
                    i18nSctnsEvent[27],
                    userName
                );
            }
        } else if ( edus[key] ) {//colleges or schools
            lbl = menu ? edus[key].editorsLbls.menu : edus[key].editorsLbls.btn;
        }
        
        return lbl;
    };//editors.lbl
    
    /**
     * Sets up the controls for a respective profile section.
     * 
     * @param object obj Data for the profile section.
     * @return string The controls for the profile section.
     */
    ctrls.init = function( obj ) {
        if ( ! canEdit ) return '';

        var p        = this,
            sctn     = p.sctn,
            lbl1     = labels[sctn] || edus[sctn].lbl,
            vis1     = 1,
            appr1    = 1,
            nameAttr = p.nameAttr,
            clss1    = p.clss + pz + 'ctrls',
            $clss1   = clss1 + pz + 'publish',
            id1      = class2Id( clss1 ),
            htm      = '<div class="' + clss1 + '">',
            pub      = { type : chkbx, value : 1 };        
        
        p.clss = clss1;//ctrls' parent class

        if ( Object.hasOwn( obj, priv ) ) {
            vis1 = parseInt( obj.visibility );
        }

        if ( Object.hasOwn( obj, appr ) ) {
            appr1 = parseInt( obj.approved );
        }

        p.appr = appr1;
        
        //Attach privacy combobox.
        htm += privacyInit( 
            vis1, 
            clss1, 
            nameAttr, 
            id1, 
            sprintf(
                i18nPhldr[4], 
                lbl1
            )
        );
        
        //Attach approval.
        htm += '<div class="' + $clss1 + '" title="';
        htm += appr1 ? i18nSctns[0] : i18nGen[27];
        htm += '"><span class="' + $clss1 + acc + '">';

        if ( appr1 ) {
            htm += sprintf(
                i18nPhldr[5], 
                lbl1
            );
        } else {
            htm += sprintf(
                i18nPhldr[6], 
                lbl1
            );
        }

        htm += '</span>';
        
        if ( isEditor ) {
            pub.name = nameAttr + '[' + appr + ']';
            pub.class = $clss1 + pz + chkbx;
            if ( appr1 ) {
                pub.checked = 'checked';                
                pub[albl]   = sprintf(
                    i18nPhldr[7], 
                    lbl1 
                );
            } else {
                pub[albl] = sprintf(
                    i18nPhldr[8], 
                    lbl1 
                );
            }
            
            htm += html.input( pub );
        }
        
        $clss1 += pz + 'icon';

        htm += '<span class="' + $clss1;
                    
        if ( ! appr1 ) {
            htm += ' ' + $clss1 + '-state--unpublished';
        }

        htm += ' dashicons-before dashicons-' + ( appr1 ? 'yes-alt' : 'warning' ) + ' ' + pubStatusIcon +'"' + ahid + '></span>';
        htm += '</div>';
            
        if ( isEditor ) {
            htm += editors.init( sctn, clss1 );
        }
                
        htm +='</div>';

        return htm;
    };//ctrls.init
    
    //Adding methods to bi object starts here.
    
    /**
     * Displays only to editors the status of the profile, offering the ability to toggle said status.
     */
    bi[pub] = function () {
        var clss1,
            id1,
            msg, 
            obj = {},
            htm = '';
        
        //Published status is only displayed if either the current user is an editor or the profile is marked as unpublished.
        if ( ! isPub  || isEditor ) {
            clss1 = plugin + pz + pub + pz + sh;
            id1   = class2Id( clss1 + pz + chkbx );

            if ( isPub ) {
                msg = i18nGen[41];

                obj.checked = 'checked';
            } else {
                msg = i18nGen[42];
            }

            htm = html.el( msg, { class : clss1 + acc } );

            if ( isEditor ) { 
                obj.type  = chkbx;
                obj.name  = plugin + '[profile][' + pub + ']';
                obj.value = 1;
                obj.id    = id1;

                htm += html.input( obj );
            }
        } 
        
        if ( htm ) {
            htm = html.template({
                table : [{
                    th    : labels[pub],
                    for   : id1,
                    body  : [{
                        attr  : { class : clss1 },
                        cntnt : htm
                    }]
                }]
            });
        }

        return htm;
    }//publish

    /**
     * Indicates if the profile's owner is logged in.
     */
    bi.loginNotice = function() {
        var icon, clss1, htm, title, isLogin;

        if ( Object.hasOwn( ptUser, 'isLogin' ) ) {
            isLogin = xToBool( ptUser.isLogin );
            
            if ( isLogin ) {
                icon = 'unlock';
            } else if ( isEditor ) {
                icon = 'lock';
            }
        }
        
        if ( icon ) {
            clss1 = plugin + pz + 'avatar' + pz + 'notices' + pz + 'login';

            htm = '<div class="' + clss1 + '"><span class="dashicons dashicons-' + icon;
            htm += ' ' + clss1 + pz + 'icon';

            if ( 'unlock' == icon ) {
                htm += pz + icon; 
            }
            
            htm += '" title="';  
            
            if ( 'lock' == icon ) {
                title = sprintf(
                    i18nPhldr[9],
                    userName
                    );
            } else {
                title = sprintf(
                    i18nPhldr[10],
                    userName
                    );
            }
            
            htm += title;

            htm += '"';
            htm += ahid;
            htm += '></span><span class="' + clss1 + acc + '">';
            htm += title;
            htm += '</span></div>';
            
            //Append the notification icon next to the Avatar.
            $( '#' + plugin + '-avatar-notices' ).css( 'vertical-align', 'top' ).prepend( htm );
        }//if ( icon ) {
    };//loginNotice

    //Adds Avatar.
    bi.avatar = {
        init: function() {
            var lbl1          = 'avatar',
                clss1         = plugin + pz + lbl1,
                id1           = class2Id( clss1 ),
                avatar        = Object.hasOwn( ptUser, lbl1 ) ? ptUser.avatar : {},
                canUpload     = Object.hasOwn( describr, 'canUpload' ) ? xToBool( describr.canUpload ) : flg,
                loadMedia     = Object.hasOwn( describr, 'loadMedia' ) ? xToBool( describr.loadMedia ) : flg,
                canUpload1    = canEdit && canUpload,
                full          = avatar.full ? 1 : 0,
                s             = pz + 'edit',
                clssEdit      = clss1 + s,
                clss2         = clss1 + pz + 'image',
                clss3         = clss2 + pz + 'source',
                clssEdit1     = clss3 + s,
                clssEdit2     = clssEdit1 + pz + 'ctrls',
                clssEdit2Btn  = clssEdit2 + pz + 'button',
                idNoLoadMedia = id1 + '-upload',
                dashIcon      = 'dashicons-before dashicons-',
                lbl2          = '';
            
            if ( isOwnProf ) {
                lbl2 = i18nGen[39];
            } else if ( userName ) {
                lbl2 = sprintf( i18nPhldr[11], userName );
            }

            ctrls.clss = clss1;
            ctrls.sctn = lbl1
            ctrls.nameAttr = plugin + '[' + lbl1 + ']';
            
            return html.template({
                id     : id1,
                clss   : clss1,
                header : labels[lbl1],
                table  : [{
                    th   : i18nGen[0],
                    for  : id1 + '-upload',
                    body : [{
                        attr : { class : clss2 + '" style="vertical-align:top;' },
                        cntnt : '<div role="img" aria-label="' + lbl2 + '"' + tbindx + ' class="' + clss3 + ( canUpload1 ? ' ' + clssEdit : '' ) + '"><div id="' + id1 + '-picture" data-id="' + ( full ? parseInt( avatar.media_id ) : '' ) + '">' + DOMPurify.sanitize( theAvatar ) + '</div>' + ( canUpload1 ? '<div' + ( ! full && ! loadMedia ? ' style="display:none;"' : '' ) + ' id="' + id1 + '-image-source-edit" class="' + hid + ' ' + clssEdit + ' ' + clssEdit1 + '"><div class="' + clssEdit2 + '">' + ( loadMedia ? btnGen({ 'aria-label' : i18nGen[1], 'class' : dashIcon + 'edit ' + clssEdit2Btn + ' ' + clssEdit2Btn + pz + 'edit ' + clssEdit }) : '' ) + btnGen({ 'aria-label' : isOwnProf ? i18nGen[2] : sprintf( i18nPhldr[12], userName ), id : id1 + '-remove', class : dashIcon + 'no-alt ' + clssEdit2Btn + ' ' + clssEdit2Btn + pz + 'remove' + ( ! full ? ' ' + hid + '" tabindex="-1' : '' ) } ) + '</div></div>' : '' ) + '</div>'
                    },{
                        attr  : { id : id1 + '-notices' },
                        cntnt :ctrls.init( avatar ) + ( ! loadMedia && canUpload1 ? '<p><span class="description">' + i18nChoose[3] + '</span><br>' + html.input( { type : 'file', name : plugin + '_avatar', accept : 'image/*', id : idNoLoadMedia, class : 'standard-text' } ) + '</p>' : '' ) + ( ! ( Object.hasOwn( describr, 'avatarPerm' ) && xToBool( describr.avatarPerm ) ) ? '<p class="description">' + sprintf( i18nPhldr[13], sanitizeTxt( describr.pluginName ) ) + '</p>' : '' )
                    }]
                }]
            });
        }//bi.avatar.init
    };//bi.avatar
    
    bi[tgl] = newObj( limitChars );

    bi[tgl].init1 = function () {
        var u        = this,
            clss1    = plugin + pz + tgl,
            clss2    = clss1 + pz + 'show',
            nameAttr = plugin + '[' + tgl + ']',
            lbl      = labels[tgl],
            htm      = '';

        u.clss        = clss2;
        u.nameAttr    = nameAttr;
        u.type        = 'input';
        u.purp        = tgl;
        u.label       = lbl;
        u.size        = 20;
        u.mxLen       = tagline_len;
        u.for         = class2Id( clss2 ) + '-description-input';
        
        //controls
        u.ctrls          = ctrls;
        u.ctrls.clss     = clss2;
        u.ctrls.sctn     = tgl;
        u.ctrls.nameAttr = nameAttr;
    
        ptUser[tgl] && ( u.exist = ptUser[tgl] );

        htm = u.init()//inherited from PTGLR.limitChars
        
        if ( htm ) {
            htm = html.template({
                table : [{
                    clss : clss1,
                    th   : lbl,
                    for  : u.for,
                    body  : [{
                        attr : {
                            class : clss2,
                        },
                        cntnt : htm 
                    }]
                }]
            });
        }

        return htm;
    };//tagline
    //This "basicInfo" object has three sections: badge, gender, and birthdate.    
    bi.basicInfo = {
        /**
         * What does this "init" method do?
         * 
         * 1) Create the templates for the main Basic Info section along with the three subsections.
         * 2) For each section, add the name attribute for the element that will submit info to server,the control element,
         *    and the class attribute.
         */
        init : function () {
            var u      = this,
                clss1  = plugin + pz + 'basic_info',
                tmplte = { clss : clss1, header : i18nGen[48], table : [] },
                k      = [ bdge, gndr, bDate, bio ],
                i      = 0;
                      
            for ( ; i < k.length; i++ ) {
                var m     = k[i],
                    clss2 = clss1 + pz + m,
                    clss3 = clss2 + pz + 'show',
                    attr  = plugin + '[' + m + ']',
                    t     = {},
                    for_,
                    init;
                
                if ( bio == m ) {
                    u[m] = newObj( limitChars );
                }

                //Give property objects access to their existing data coming from the database.
                ptUser[m] && ( u[m].exist = ptUser[m] );

                u[m].clss = clss3;//Add the class to each section.
                
                //ctrls for each section
                u[m].ctrls          = ctrls;
                u[m].ctrls.clss     = clss3;
                u[m].ctrls.sctn     = m;
                u[m].ctrls.nameAttr = attr;

                //name attribute's value for each section
                u[m].nameAttr = attr;
                
                init = u[m].init();

                if ( init ) {
                    t.clss = clss2;
                    t.th   = labels[m];
                    t.body = [{
                        attr  : { class : clss3 },
                        cntnt : init 
                    }];
                                
                    tmplte.table[i] = t;
                }   
            }
            
            return tmplte.table.length ? html.template( tmplte ) : '';            
        },//init
        badge : {
            init : function () {
                var u        = this,
                    clss1    = u.clss,
                    clss2    = clss1 + pz + 'name',
                    exist    = u.exist || {},
                    fNameLbl = i18nGen[13],
                    lNameLbl = i18nGen[14],
                    name     = 'first_name',
                    name1    = 'last_name',
                    name2    = '',
                    fName    = '',
                    lName    = '',
                    htm      = '';
                
                u.clss = clss2;

                if ( canEdit ) {
                   //describr[basic_info][name][first_name]
                   //describr[basic_info][name][last_name]
                   if ( exist ) {
                       if ( Object.hasOwn( exist, name ) ) {
                           fName = exist[name];
                       }

                       if ( Object.hasOwn( exist, name1 ) ) {
                           lName = exist[name1];
                       }
                   }

                   htm += u.input( fName, name, fNameLbl );
                   htm += u.input( lName, name1, lNameLbl );


                   htm = html.el( htm, { class : clss2 } );

                   htm += u.ctrls.init( exist );
               } else if ( userName ) {
                   htm = userName;
               }
        
               return htm;
            },//init
            input : function( val, name, lbl ) {
                var u     = this,
                    obj   = {},
                    htm   = '',
                    clss1 = u.clss + pz + name,
                    clss2 = clss1 + pz + 'input';
        
                obj.type          = 'text';
                obj.name          = u.nameAttr + '[' + name + ']';//describr[badge][first/last__name]
                obj.placeholder   = lbl;
                obj.class         = clss2;
                obj['aria-label'] = lbl;

                if ( val ) {
                    obj.value = val;
                }
                    
                //First name will have an ID matching label "for" attribute for this section.
                if ( 'first_name' == name ) {
                    obj.id = class2Id( clss2 ).replace( /_(?!.[-]{1})/, '-' );
                }
            
                htm += html.input( obj );        

                return html.el( htm, { class : clss1 } );
            }
        },//badge
        gender : {
            init : function () {
                var u        = this,
                    clss1    = u.clss,
                    clss2    = clss1 + pz +  ptSrch,
                    exist    = u.exist || {},
                    nameAttr = u.nameAttr,
                    gndrs    = u.types,
                    htm      = '',
                    curGndr  = '',
                    curGndr1 = '',
                    options  = [],
                    obj      = {},//items for display
                    obj1     = {},//items for input element
                    id1,
                    g;

                u.clss = clss2;//this class

                //describr[gender][type]
                if ( exist.type ) {
                  curGndr  = gndrs[exist.type];
                  curGndr1 = exist.type;
                }

                if ( canEdit ) {
                    //Set the label as the default gender if the user has yet to select a gender.
                    if ( ! curGndr ) {
                        curGndr = labels[gndr];
                    }
                    
                    //Set the label as the selected option if the user has yet to select a gender.
                    if ( ! curGndr1 ) {
                        options.push( {
                            value    : '',
                            label    : curGndr,
                            selected : $tru
                        });
                    }

                    for ( g in gndrs ) {
                        var opt = { value : g, label : gndrs[g] };

                        if ( g == curGndr1 ) {
                            opt.selected = $tru;
                        }    

                        options.push( opt );
                    }

                    id1 = class2Id ( clss2 );

                    obj.option = options;
                    obj.class  = clss2;
                    obj.label  = labels[gndr];
                    obj.purp   = gndr;              
                    obj.id     = id1;
                    
                    if ( curGndr1 ) {
                        obj1.value = curGndr1;//input value
                    }
                    
                    obj1.type   = hid;
                    obj1.name   = nameAttr + '[type]';
                    obj1[dpurp] = sb1;

                    obj.extra = [ html.input( obj1 ) ];
                    
                    htm = select( obj );

                    htm += u.ctrls.init( exist );
               } else if ( curGndr ){
                  htm = curGndr;
               }
               return htm;
            },//init
            types : {
                m : i18nGen[43],
                f : i18nGen[44]
            }
        }//gender        
    };//bi.basicInfo
    
    bi.basicInfo[bDate]      = newObj( datePickr );
    bi.basicInfo[bDate].init = function () {
        var u     = this,
            clss1 = u.clss,
            clss2 = clss1 + pz + 'date',
            exist = u.exist || {},
            htm   = '',
            date  = exist.date || '',////describr[birthdate][date]
            id1;
        
        u.clss = clss2;
        u.id   = class2Id( clss2 );
        
        if ( canEdit ) {
            htm = time.setupDate({
                class    : clss2,
                date     : date,
                nameAttr : u.nameAttr + '[date]',
                sctn     : bDate
            });
        } else if ( date ) {
            htm = date;
        }
        
        if ( htm ) {
            htm = html.el( htm, { class : clss2 } );
        }
                                  
       
        if ( canEdit ) {
            htm += u.ctrls.init( exist );
        }

        return htm;
    };//birthdate.init
    
    bi[addr] = {
        //The wrapper for the address section is set here.
        init : function() {
            var clss     = rootClsAddr,
                $clss    = clss + pz + sh,
                id       = class2Id( rootClsAddr ),
                nameAttr = nameAttrAddr + '[',
                u        = this,
                obj      = { id : id, clss: clss, header : labels[addr], table : [] },
                i        = 0,
                test     = 'current_city',
                addr1    = ptUser[addr] || {},
                input;

            clss += pz;
            id   += '-';
            
            ptLocs.forEach( function( loc ) {
                var htm            = '',
                    idBinfoAddrLoc = id + loc,
                    class1         = clss + loc,
                    classLoc       = class1 + pz + sh,
                    classLocSrch   = classLoc + pz + 'search',
                    idBinfoAddrLoc = class2Id(classLocSrch),
                    ctrls1         = idBinfoAddrLoc + '-select',
                    inputId        = idBinfoAddrLoc + '-input',
                    obj1           = {};

                if ( lCty == loc ) {
                    htm += u.lived_cities.init( addr1 );
                } else  {
                    var classLocCtrl     = classLoc + pz + 'ctrls',
                        classLocCtrlAppr = classLocCtrl + pz + 'approval',
                        placeholder      = test == loc ? i18nGen[15] : i18nGen[16],
                        city,
                        attr,
                        attr1 = {};

                    if ( addr1[loc] ) {
                        city = addr1[loc];
                    }

                    if ( canEdit ) {
                        attr = newObj( attrCbx );

                        attr[actrl] = ctrls1;
                        attr[albl]  = placeholder;
                        attr[phldr] = placeholder;
                        attr.class  = classLocSrch + $inputAuto;
                        attr[dinfo] = loc;
                        attr.id = inputId;
                                                 
                        if ( city ) {
                            attr.value = city;
                        }        

                        input = html.input( attr );
                        
                        //Adds the attributes for the hidden input element that holds the city that will be submitted to the server.
                        attr1.type = hid;
                        attr1.name = nameAttr + loc + ']';
                            
                        if ( city ) {
                            attr1.value = city;
                        }

                        attr1[dpurp] = sb1;

                        input += html.input( attr1 );
                        
                        htm += html.el( input, { id : idBinfoAddrLoc, class : classLocSrch } );
                    } else if ( city ) {
                        htm += city;
                    }
                }
                
                if ( htm ) {
                    obj1.id   = class2Id( class1 );
                    obj1.clss = class1;
                    obj1.th   = labels[loc];

                    //There can be more than one lived cities; therefore, having a "for" attribute for their section's label would be impractical.
                    if ( lCty != loc ) {
                        obj1.for = inputId;
                    }

                    obj1.body = [{
                        attr  : { class : classLoc },
                        cntnt : htm
                    }];

                    obj.table[i] = obj1;

                    i++;
                }
            });
            
            if ( canEdit ) {
                //Attach controls for addresses.
                ctrls.clss     = $clss;
                ctrls.sctn     = addr;
                ctrls.nameAttr = nameAttrAddr;

                obj.table[i] = {
                    body : [{
                        attr  : { class : $clss },
                        cntnt : ctrls.init( addr1 )
                    }]
                };
            }
            
            return obj.table.length ? html.template( obj ) : '';
        },//init
        //lived_cities' html is done on this page, but eventually it will be placed here.
        lived_cities : {
            init : function( addr ) {
                var q        = this,
                    srch     = q.search,
                    tp       = q.tP,
                    cities   = addr[lCty] || [],
                    $clss$   = rootLivedCities + pz,
                    $clss1   = $clss$ + 'city',
                    clssAux1 = pz + dp + pz,
                    attr     = nameAttrAddr + '[' + lCty + ']',
                    htm      = '';
                                                
                srch.nCities = 0;
                tp.nCities   = 0;

                srch.nameAttr = attr;
                tp.nameAttr   = attr;

                srch.clss = $clss$ + 'search'; 
                tp.clss   = $clss$ + 'timeperiod';

                //Attaches cities already saved, if any.
                cities.length && cities.sort( cmpDates ).forEach( function( city ) {
                    if ( canEdit ) {
                        //Search box
                        htm += q.search.init( city ); 

                        //Time period's moved date
                        htm += q.tP.init( city );
                            
                        srch.nCities++;
                        tp.nCities++;
                    } else {
                        var name  = city.city || '',
                            moved = city.moved || '',
                            x     = '';

                        if ( name ) {
                            x += html.el( name, { class : $clss1 + clssAux1 + 'name' } );
                            
                            if ( moved ) {
                                moved = sprintf(
                                    i18nPhldr[14],
                                    moved
                                );

                                x += html.el( moved, { class : $clss1 + clssAux1 + 'moved' } );
                            }

                            htm += html.el( subsctn( { class : { main : $clss1, cntnt : dp }, icon : 'map-marker', cntnt : x } ), { class : $clss1 } );
                        }
                    }
                        
                });//arrCity.forEach ends here.
                
                if ( canEdit ) {
                    htm += srch.init() + tp.init();
                }

                return htm;
            },//lived_cities.init

            search : {
                init : function( obj ) {
                    obj = obj || {};
                    var s = this;
                    
                    return s.wrap( s.txtBx( obj ) );
                },
                wrap : function( cntnt ) {
                    return html.el( cntnt, { class : this.clss } );
                },
                txtBx : function( obj ) {
                    obj = obj || {};
                    var s       = this,
                        clss1   = s.clss,
                        nCities = s.nCities,
                        idGen   = class2Id( clss1 ),
                        idSlct  = idGen + '-select-' + nCities,
                        idTxtBx = idGen + '-input-' + nCities,
                        city    = obj.city ||  '',
                        attr    = newObj( attrCbx );
                       
                    attr[dinfo] = lCty;
                    attr[albl]  = i18nGen[23];
                    attr[phldr] = i18nGen[24];
                    attr[actrl] = idSlct;
                    attr.id     = idTxtBx;
                    attr.class  = clss1 + $inputAuto;

                    if ( city ) {
                        obj.city   = city;
                        attr.value = city;    
                    }

                    return html.input( attr ) + s.hidBx( obj );
                },
                hidBx : function( obj ) {
                    obj = obj || {};
                    var u    = this,
                        attr = { type : hid, name : u.nameAttr + '[' + u.nCities + '][city]' };
                        
                    attr[dpurp] = sb1;

                    if ( obj.city ) {
                        attr.value = obj.city;
                    }
                        
                    return html.input( attr );
                }
            },//Search
            //Time period
            tP : {
                actn : ['moved'],
                init : function( args ) {
                    args = args || {};
                    var u       = this,
                        nCity   = u.nCities,
                        baseNme = u.nameAttr + '[' + nCity + ']',
                        wr      = u.clss,
                        id1     = class2Id( wr ) + '-' + nCity,
                        htm     = '<div class="' + wr + '">';
                                            
                    for ( var i = 0, sctn = u.actn, len = sctn.length; i < len; i++ ) {
                        var sec   = sctn[i],
                            clss1 = wr + pz + sec,
                            
                            date  = time.setupDate({ 
                                class    : clss1, 
                                id       : id1 + '-' + sec, 
                                date     : args[sec] || '', 
                                nameAttr : baseNme + '[' + sec + ']',
                                sctn     : lCty
                            });
                        
                        if ( ! date ) continue;
                        
                        //datePicker object for each section of timeperiod
                        u[sec]         = newObj( datePickr );
                        u[sec].typeVal = lCty;
                        u[sec].clss    = clss1;                       
                        
                        htm += '<div class="' + clss1 + '"><strong class="';
                        htm += clss1;
                        htm += pz + 'label">';
                        htm += i18nGen[25];
                        htm += '</strong>';                        
                        htm += date;
                        htm += '</div>';
                    }
                    
                    htm += '</div>';//Time Period's wrapper ends here.

                    return htm;
                }
            }//tP            
        }//Lived cities property
    };//Addresses
    
    //Creates basic_info editors
    bi.editors = editors;

    bi[$rel] = {
        clss : plugin + pz + $rel
    };

    bi[$rel].init = function() {
        var u         = this,
            clss1     = u.clss,
            $clss1    = clss1 + pz + sh,
            ctrs1     = u.ctrls,
            exist     = ptUser[$rel] || {},
            prtnr     = exist[$prtnr] || {},
            since     = prtnr[$since] || '',
            status    = exist.status || '',
            nameAttr  = plugin + '[' + $rel + ']',
            $nameAttr = nameAttr + '[' + $prtnr + ']',
            prntr$    = u[$prtnr],
            since$    = prntr$[$since],
            status$   = u[$status],
            htm       = '';
        
        //status
        status$.nameAttr = nameAttr;
        status$.clss     = $clss1 + pz + $status;
        
        //partner
        prntr$.nameAttr = $nameAttr;
        prntr$.clss     = $clss1 + pz + $prtnr;
        prntr$.clss1    = $clss1;
        prntr$.id       = class2Id( $clss1 ) + '-' + $prtnr;
        prntr$.types    = status$.types;

        //partner since
        since$.typeVal  = $since;
        since$.nameAttr = $nameAttr;
        since$.clss     = $clss1 + pz + $since;
        since$[$prtnr]  = prtnr;
        
        //call the inits
        htm += status$.init( status );
        htm += prntr$.init( exist );
        htm += since$.init();
        
        if ( htm ) {
            ctrls.clss     = $clss1;
            ctrls.sctn     = $rel;
            ctrls.nameAttr = nameAttr;

            htm += ctrls.init( exist );
        }
        
        if ( cantEditRel ) {
            htm = cantEditRel;
        }
        
        if ( htm ) {
            htm = html.template({
                table : [{
                    th   : labels[$rel],
                    clss : clss1,
                    body : [{
                        attr : {
                            class : $clss1
                        },
                        cntnt : htm
                    }]
                }]            
            });
        }

        return htm; 
    };//relationship.init
    
    bi[$rel][$status] = {
        init : function( status ) {
            var u          = this,
                types      = u.types, 
                i          = 0,
                findStatus = !1,
                clss1      = u.clss,
                clss2      = clss1 + pz + ptSrch,
                id1        = class2Id( clss2 ),
                attr       = { type : hid, name : u.nameAttr + '[' + $status + ']' },
                val        = '',
                htm        = '';

            if ( ! status ) {
                status = '';
            }

            while ( i < types.length ) {
                var obj = types[i];

                if ( obj[status] ) {
                    val = obj[status];

                    findStatus = !0;

                    break;
                }

                i++;
            }
            
            if ( canEdit ) {
                obj.option = u.options( status );//Placed here so that the "options" object can interpret an empty value

                if ( ! findStatus ) {
                    val = types[0]['st'];
                }
                
                attr[dpurp] = sb1;

                if ( findStatus ) {
                    attr.value = status;
                }

                obj.class  = clss2;
                obj.label  = i18nRel.labels[0];
                obj.purp   = $status;              
                obj.id     = id1;                

                obj.extra = [ html.input( attr ) ];
           
                htm = html.el( select( obj ), { class : clss1 } );
            } else if ( val ) {
                cantEditRel = val;
            }
            
            return htm;
        },//status.init
        options : function( curStatus ) {
            var options = [];
            
            this.types.forEach( function( rel ) {
                for ( var r in rel ) {
                    var val = r, obj = {};

                    if ( 'st' == r ) {
                        val = '';

                        if ( curStatus ) {
                            continue;
                        }
                    }
                    
                    obj.value = val;
                    obj.label = rel[r];
                    
                    if ( curStatus == r ) {
                        obj.selected = $tru;
                    }
                    
                    options.push( obj );
                }
            });

            return options;
        },//relationship.status.options
        types : [
            {
                st : i18nRel.labels[1]
            },
            {
                s : i18nRel.status[0]
            },
            {
                iar : i18nRel.status[1]
            },
            {
                eng : i18nRel.status[2]
            },
            {
                m : i18nRel.status[3]
            },
            {
                sep : i18nRel.status[4]
            },
            {
                div : i18nRel.status[5]
            },
            {
                wid : i18nRel.status[6]
            },
            {
                dr : i18nRel.status[7]
            },
            {
                cu : i18nRel.status[8]
            },
            {
                fwb : i18nRel.status[9]
            }
        ]//types
    };//relationship.status
   
    bi[$rel][$prtnr] = {
        init : function( rel ) {
            var u          = this,
                clss1      = u.clss,
                id1        = class2Id( clss1 ),
                id2        = id1 + '-input',
                ctrls1     = id1 + '-select',
                prtnr      = rel[$prtnr] || {},
                status     = rel[$status] || '',
                attr,
                prtnrId,
                attr1      = {},
                nameAttr   = u.nameAttr,
                name       = '',
                htm        = '';

            u.id2 = id2;

            if ( prtnr.name ) {
                name = prtnr.name;

                if ( prtnr.id ) {
                    prtnrId = parseInt( prtnr.id );

                    attr1.value = prtnrId;
                }
            }

            if ( canEdit ) {
                attr1.type   = hid;
                attr1.name   = nameAttr + '[id]';
                attr1[dpurp] = sb1;
                
                attr = newObj( attrCbx );
                
                attr.name   = nameAttr + '[name]';
                attr[actrl] = ctrls1;
                attr[albl]  = i18nRel.labels[2];
                attr[dinfo] = $prtnr;
                attr[phldr] = i18nRel.labels[3];
                attr.class  = clss1 + $inputAuto;
                attr.id     = id2;
                
                if ( name ) {
                    attr.value = name;
                }

                htm = html.cbxWr(
                    html.input( attr ) + html.input( attr1 ), 
                    {
                        class : clss1,
                        id    : id1
                    } 
                );
            } else if ( name ) {
                if ( ! status || 's' == status ) {
                    status = 'iar';

                    u.types.forEach( function ( rel ) {
                        if ( rel[status] ) {
                            cantEditRel = rel[status];
                        }
                    });
                }

                if ( cantEditRel ) {
                    cantEditRel += ' ' + u.prep[status] + ' ';
                }

                if ( prtnrId ) {
                    cantEditRel += '<a href="' + describr.adminurl + 'user-edit.php?user_id=' + prtnrId + '" class="' + u.clss1 + pz + 'link">';
                } else {
                    cantEditRel += '<strong>';
                }

                cantEditRel += name;
                cantEditRel +='</' + ( prtnrId ? 'a' :'strong' ) + '>';                              
            }
            
            return htm;
        },//prtnr.init
        prep : {
            iar : $with,
            eng : $to$,
            m   : $to$,
            sep : $from$,
            div : $from$,
            wid : $by,
            dr  : $with,
            cu  : $with,
            fwb : $with
        }//prep
    };//relationship.partner

    bi[$rel][$prtnr][$since] = newObj( datePickr );    
    bi[$rel][$prtnr][$since].init = function() {
        var u     = this,
            clss1 = u.clss,
            since = '',
            htm   = '',
            k;

        u.id = class2Id( clss1 );

        //This "rel" object is set in relationship's init method.
        if ( u[$prtnr] ) {
            k = u[$prtnr];

            if ( k[$since] ) {
                since = k[$since];
            }
        }

        if ( canEdit ) {
            htm = time.setupDate({
            class    : clss1,
            id       : u.id,
            date     : since,
            nameAttr : u.nameAttr + '[' + $since + ']',
            sctn     : $since
            }); 
     
        
            if ( htm ) {
                htm = '<div class="' + clss1 + '"><strong class="' + clss1 + pz + 'label">' + i18nRel.labels[4] + '</strong>' + htm + '</div>';
            }
        } else if ( since && cantEditRel ) {

            cantEditRel += ' ' + i18nRel.labels[5] + ' ' + since;
        }                        
                    
        return htm;
    };//prtnr.since.init
    
    //Languages begin here.
    bi[$lang] = {
        gridClass     : '',
        gridrowClass  : '',//This class is used by JavaScript to update the grid's rows, only one of which is used as of now.
        gridcellClass : '',//This class is used by JavaScript to update the grid cells as they are added or removed by the user.
        maxrow        : 0,//Stores the number of rows on the page.
        maxcol        : 0,//Stores the number of columns on the page.
        /**
         * Setups html layout for the language section.
         *
         * @return All the aspects of the languages' section.
         */ 
        init : function() {
            var u         = this,
                $nameAttr = plugin + '[' + $lang + ']',
                $clss     = plugin + pz + $lang,
                $clss1    = $clss + pz + sh,
                $id       = class2Id( $clss ),
                $id1      = $id + '-' + sh,
                clss      = $clss1,
                clss1     = clss + pz + ptSrch,
                id        = $id1,
                id1       = id + '-' + ptSrch,
                id2       = id1 + '-input',
                ctrls1    = id1 + '-select',
                langs     = ptUser[$lang] || {},
                val       = '',
                htm       = '',
                attr;
            
            //These id and class are used by methods.
            u.clss  = $clss;
            u.clss1 = $clss1;
            u.clss2 = clss1;
            u.id    = $id;
            u.id1   = $id1;
            u.id2   = id1;
                        
            //Check if user has previously saved languages and displays them.
            if ( langs[$lang] ) {
                /**
                 * @var string
                 */
                val = langs[$lang];

                htm = u.grid( val );//Get the grid element, after passing the user's languages as argument.
            }
            
            if ( canEdit ) {
                
                u.gridClass = clss1 + pz + 'grid';//Set the html class for the grid element.

                attr = newObj( attrCbx );
                
                attr[albl]  = i18nGen[18];
                attr[actrl] = ctrls1;
                attr[dinfo] = $lang;
                attr[phldr] = i18nGen[19];
                attr.class  = clss1 + $inputAuto;
                attr.id     = id2;
                
                htm += html.input( attr );
                
                //Attaches the input element responsible for sending data to the server.
                attr = {
                    type : hid,
                    name : $nameAttr + '[' + $lang + ']'
                }
                
                attr[dpurp] = sb1;

                if ( val ) {
                    attr.value = val;
                }

                htm += html.input( attr );

                htm = html.cbxWr(
                    htm, 
                    {
                        class : clss1,
                        id    : id1
                    }
                );
                
                //Add the controls
                ctrls.clss     = clss;
                ctrls.sctn     = $lang;
                ctrls.nameAttr = $nameAttr;
                
                htm += ctrls.init( langs );
            }

            if ( htm ) {
                htm =  html.template({
                    table : [{
                        id   : u.id,
                        clss : u.clss,
                        th   : labels[$lang],
                        for  : id2,
                        body : [{
                            attr : {
                                'aria-label' : labels[$lang],
                                class        : clss,
                                id           : id
                            },
                            cntnt : htm
                         }]
                    }]
                });
            }

            return htm;
        },//lang.init
        /**
         * Displays the user's language (s) in html element with role = grid.
         * 
         * @param string langs The codes, separated by commas, for languages.
         * @return string html grid element with its children elements, otherwise empty string.
         */
        grid : function( langs ) {
            var u    = this,
                htm  = '';
        
            if ( langs ) {
                if ( canEdit && ! u.gridClass ) {
                    u.gridClass = u.clss2 + pz + 'grid';
                }

                htm = u.row( langs );

                if ( canEdit ) {

                    htm = html.el(
                        htm, 
                        { 
                            role         : 'grid', 
                            'aria-label' : i18nGen[20],
                            class        : u.gridClass 
                        },
                        'span'
                    );
                }
            }

            return htm;
        },//langs.grid
        /**
         * Creates a single html div with role attribute set to row. 
         * This div contains the gridecells.
         * 
         * @param string langs The codes, separated by commas, for languages. 
         * @return string html row element containing the gridcells, otherwise an empty string.
         */
        row : function ( langs ) {
            var u     = this,
                clss1 = canEdit ? u.gridClass + pz + 'row' : '',
                htm   = '',
                langs = langs ? langs.split( ',' ) : [],
                len   = langs.length,
                i     = 0,
                num;
            
            if ( clss1 && ! u.gridrowClass ) {
                u.gridrowClass = clss1;
            }

            while ( i < len ) {
                //If the user doesn't have editing privileges, each language is displayed in plain text without editing abilities.
                if ( htm && ! canEdit ) {
                    //If the number of languages is greater than two, separate each language with a comma.
                    if ( 2 < len ) {
                        htm += ','//No space is added because this will not be executed if only two languages exist.
                    }
                    
                    //A space is always added if more than two languages exist.
                    if ( 1 < len ) {
                        htm += ' ';
                        //"and" is added if more than one language exist and we are at the penultimate language.
                        if ( ( i + 1 ) == len ) {
                            htm += i18nGen[45];
                            htm += ' ';
                        }
                    }
                }
                
                if ( canEdit ) {
                    describrLangsArr[describrLangsArr.length] = langs[i];
                }
                
                htm += u.gridcell( langs[i] );
                
                i++;
            };

            if ( htm && canEdit ) {
                htm = html.el(
                    htm,
                    { class : clss1, role : 'row' },
                    'span'
                );
            }

            return htm;
        },//langs.row
        /**
         * Creates a single html div with role attribute set to gridcell. 
         * 
         * @param string langCode The code for the language to be wrapped in gridcell 
         * @return string html gridcell element containing both language and icon for removing language, otherwise an empty string.
         */
        gridcell : function( langCode ) {
            var u     = this,
                role  = 'gridcell',
                clss1 = canEdit ? u.gridrowClass + pz + role : '',
                lang  = u.getLang( langCode );
        
            if ( lang && canEdit ) {
                if ( ! u.gridcellClass ) {
                    u.gridcellClass = clss1;
                }
                
                lang = html.el( 
                    '<span class="' + clss1 + pz + 'lang">' + lang + '</span><button type="button" data-plugin="' + plugin + '" data-purp="removelang" data-langcode="' + langCode + '" class="' + clss1 + pz + 'button dashicons-before dashicons-no-alt" aria-label="' + i18nGen[21] + ' ' + lang + '"></button>', 
                    {
                        role     : role, 
                        tabindex : '-1', 
                        class    : clss1 
                    },
                    'span'
                ); 
            }

            return lang;
        },//langs.gridcell
        /**
         * Fetches language
         * 
         * @param string langCode ISO code for the language to fetch.
         * @return string The language, otherwise an empty string.
         */
        getLang : function ( langCode ) {
            var lang = '';

            if ( Object.hasOwn( describrLangs, langCode ) ) {
                lang = describrLangs[langCode];
            }

            return  lang;
        },//langs.getLang
        /**
         * Gets the number of rows and column as well as sets the data-row and data-col attributes on each cell.
         * 
         * Gets called when a new language is selected, a language is deleted, and the language section is instantiated. 
         * 
         * Credit for the three JavaScript methods: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role
         */
        jsUpdate : function () {
            var u           = this, 
                t           = '.',
                cellClass   = u.gridcellClass,
                selectables = cellClass ? doc.find( t + cellClass ) : '',//Gets all grid cells.
                gridrows    = cellClass ? doc.find( t + u.gridrowClass ) : '',//Get all rows belonging to the grid.
                row         = 0,
                col         = 0;
            
            if ( ! selectables.length ) return;
            
            //All the cells' tabindices are set to -1, which makes them not focusable by default, hence we set the first cell's tabindex to 0 to make the cell focusable.
            selectables.eq( 0 ).attr( 'tabindex', 0 );
            
            u.maxrow = gridrows.length -1;
            u.maxcol = 0;

            //Iterate of over rows
            gridrows.length && gridrows.each( function () {
                //Gets the cells of the current row, iterates over them, and adds the relevant row and columns
                $( this ).find( t + cellClass ).each( function() {
                    var el = this;
                    
                    $( el ).attr( 'data-row', row );
                    $( el ).attr( 'data-col', col );
                    
                    col++;     
                });

                //Updates the maximum number of columns.
                if ( col > u.maxcol ) {
                    u.maxcol = col - 1;
                }

                col = 0;//Resets the column so that cells that line up with each other vertically share the same column (data-col="colx").
                row++ //Ensures that cells that line up with each other horizontally share the same row (data-row="rowx").
            });
        },//jsUpdate
        /**
         * Focuses on the cell to which the user has chosen to relocate.
         * 
         * @param int newrow The row's number of the new cell.
         * @param int newcol The column's number of the new cell.
         * @return bool True if the new cell was located, otherwise False.
         * */
        jsMoveto : function ( newrow, newcol ) {
            var tabin    = 'tabindex',
                gridcell = '.' + this.gridcellClass,//The class of the cells
                newcell  = doc.find( gridcell + '[data-row="' + newrow + '"][data-col="' + newcol + '"]');//The new cell
            
            //Is the element actually a gridcell?
            if ( newcell.attr( 'role' ) == 'gridcell' ) {
                //Makes all cells unfocusable.
                doc.find( gridcell ).each( function() {
                    $( this ).attr( tabin, '-1' );
                });
                
                newcell.attr( tabin, 0 );//Tabindex=0 so the cell can be focused();
                newcell[0].focus();//Sets focus on the element to which the user wants to locate.

                return $tru;//Returns true as the element was found.
            } else {
                return flg;//Returns false as the element was not found.
            }
        },//jsMoveTo
        /**
         * Processes the keydown event according to ARIA accessability specifications on the grid element.
         * 
         * @param object event The API for the keydown event.
         */
        jsEvent : function( event ) {
            var el     = event.target,
                u      = this, 
                col    = parseInt( el.dataset.col, 10 ),//The column the user wants to move from 
                row    = parseInt( el.dataset.row, 10 ), //The row the user wants to move from 
                maxrow = u.maxrow, 
                maxcol = u.maxcol,
                newrow = 0;
            
            switch ( event.key ) {
                case "ArrowRight": 
                    var newcol = col === maxcol ? 0 : col + 1;
                    u.jsMoveto(newrow, newcol);
                break;
                        
                case "ArrowLeft": 
                    var newcol = col === 0 ? maxcol : col - 1;
                    u.jsMoveto(newrow, newcol);
                break;
                        
                case "ArrowDown":
                    u.jsMoveto(row + 1, col);
                break;

                case "ArrowUp":
                    u.jsMoveto(row - 1, col);
                break;

                case "Home": 
                    if (event.ctrlKey) {
                        var i = 0,
                            result;
                        do {
                            var j = 0;
                            do {
                                result = u.jsMoveto(i, j);
                                j++;
                            } while (!result);
                            i++;
                        } while (!result);
                    } else {
                        u.jsMoveto(row, 0);
                    }   
                break;
                        
                case "End": 
                    if (event.ctrlKey) {
                        var i = maxrow,
                            result;
                        do {
                            var j = maxcol;
                            do {
                                result = u.jsMoveto(i, j);
                                j--;
                            } while (!result);
                            i--;
                        } while (!result);
                    } else {
                        u.jsMoveto(
                            row,
                            doc.find( '.' + u.gridcellClass +'[data-row="' + el.dataset.row + '"]' ).last().getData( 'col' )
                        );
                    }
                break;
                       
                case "PageUp":
                    var i = 0,
                        result;
                   do {
                        result = u.jsMoveto(i, col);
                        i++;
                    } while (!result);
                break;
                      
                case "PageDown": 
                var i = maxrow,
                    result;
                do {
                    result = u.jsMoveto(i, col);
                    i--;
                } while (!result);
                break;
            }
                    
            event.preventDefault();//Cancel the default action to avoid it being handled twice.
        }
    };//bi.langs

    bi[cntc] = {
        name : plugin + '[' + cntc + ']',
        init : function() {
            var u      = this,
                name   = u.name,
                obj    = {},
                q      = cntc,
                templ  = { table : [] },
                htm    = '',
                c      = pz,
                sh     = c + 'show',
                y      = u[ fne ],//this.phones
                z      = u[ eml ],//this.email
                clss1  = plugin + c + q,//describr__contact
                clss2  = clss1 + c + fne,//describr__contact__phones
                clss3  = clss2 + sh,//describr__contact__phones__show
                
                clss4  = clss1 + c + eml,//describr__contact__email
                clss5  = clss4 + sh;//describr__contact__email__show
                //
            u.clss = clss1;

            y.clss = clss3;

            y.name     = u.name;
            y.htm.clss = clss3 + c + 'phone';
                    
            //Give phones.htm access to phones.type and phones.errors methods.
            y.htm.types = y.types;
            y.htm.errors = y.errors;  
            
            //this.email properties
            z.clss = clss5;
            z.name = u.name;

            //Check for previously saved contacts.
            if ( Object.hasOwn( ptUser, q ) ) {
                obj = ptUser[q];
            }

            htm = u[fne].init( obj );//phones

            if ( htm ) {
                templ.table.push({//phones
                    clss  : clss2,
                    th    : labels[fne],
                    body  : [{
                        attr  : { class : clss3 },
                        cntnt : htm
                    }]
                });
            }

            htm = u[eml].init( obj );//email
            
            if ( htm ) {
                templ.table.push({//email
                    th    : labels[eml],
                    for   : class2Id( clss5 ) + '-address-input', 
                    body  : [{
                        attr  : { class : clss5 },
                        cntnt : htm
                    }]
                });
            }
            
            if ( templ.table.length ) {
                templ.header = labels[q];

                return html.template( templ );
            } else {
                return '';
            }
        },
        phones : {
            types : {
                MOBILE               : i18nContact.phones.types.MOBILE,
                FIXED_LINE           : i18nContact.phones.types.FIXED_LINE,
                FIXED_LINE_OR_MOBILE : i18nContact.phones.types.FIXED_LINE_OR_MOBILE,
                PREMIUM_RATE         : i18nContact.phones.types.PREMIUM_RATE,
                SHARED_COST          : i18nContact.phones.types.SHARED_COST,
                VOIP                 : i18nContact.phones.types.VOIP,
                PERSONAL_NUMBER      : i18nContact.phones.types.PERSONAL_NUMBER,
                PAGER                : i18nContact.phones.types.PAGER,
                VOICEMAIL            : i18nContact.phones.types.VOICEMAIL
            },
            errors : {
                NOT_A_NUMBER     : i18nContact.phones.errors.NOT_A_NUMBER,
                INVALID_COUNTRY  : i18nContact.phones.errors.INVALID_COUNTRY,
                TOO_SHORT        : i18nContact.phones.errors.TOO_SHORT,
                TOO_LONG         : i18nContact.phones.errors.TOO_LONG,
                INCORRECT_FORMAT : i18nContact.phones.errors.INCORRECT_FORMAT
            },
            /**
             * @param object contact Contact info coming from server.
             * @return string phone numbers.
             */
            init : function( contact ) {
                var u        = this,
                    clss1    = u.clss,
                    ph       = {},
                    z        = 'numbers',//index where phone numbers are located
                    nameAttr = u.name + '[' + fne + ']',
                    htm      = '',
                    val;
                
                if ( canEdit ) {
                    u.htm.nameAttr = nameAttr + '[' + z + '][]';
                }

                //Check for existing phone numbers: describr[contact][phones]
                if ( contact[fne] ) {
                    ph = contact[fne];

                    if ( ph[z] ) {
                        val = ph[z];//describr[contact][phones][numbers][]
                        Array.isArray( val ) && val.length && val.forEach(function( num ) {
                            htm += u.htm.init( num );
                        });
                    }
                }

                if ( canEdit ) {
                    //After displaying existing phone numbers, 
                    //add a combobox for country and two text boxes for phone number 
                    //and extension so that the user can add more phone numbers to the profile.
                    htm += u.htm.init( '', 'noPhoneNumber' );                            
                    
                    //Adds the controls
                    ctrls.clss     = clss1;
                    ctrls.sctn     = fne;
                    ctrls.nameAttr = nameAttr;

                    htm += ctrls.init( ph );
                }

                return htm;
            },//init
            htm : {
                uniqueId : 0,
                /**
                 * Creates html layout for choosing and displaying numbers
                 * 
                 * @param object phoneNumber The specification for the phoner number in question
                 * @param string|bool state  Indicates how to display the phone number. True if a phone number exists.
                 * @return string Html layout for choosing and displaying numbers
                 */
                init : function( phoneNum, state ) {
                    var u           = this,
                        clss1       = u.clss,
                        oldNum      = 'phoneNumberOld',
                        classErr    = 'error',
                        width       = u.width,
                        aux         = '',
                        error       = '',
                        fNum        = '',
                        fNum1       = '',
                        fNumWrppr   = { class : clss1 },
                        obj         = {},
                        phoneNumber = {},
                        countryCode = '',
                        ext         = '',
                        extType     = '',
                        phType      = '',
                        testPhType  = '',
                        htm         = '',
                        style       = '',
                        parseNum,
                        phoneSpecs,
                        numParts,
                        len;
                    
                    if ( phoneNum ) {
                        phoneSpecs = String( phoneNum ).split( phoneSep );
                        
                        len = phoneSpecs.length;
                        
                        phoneNumber.nationalNumber = phoneSpecs[0];

                        if ( 1 < len ) {
                            phoneNumber.country = phoneSpecs[len-1];
                        }

                        if ( canEdit ) {
                            //Old unsparsed phone number
                            phoneNumber.phoneNumberOld = phoneNum;
                        }
                        
                        
                        numParts = u.splitPhoneNum( phoneNumber );
                        
                        if ( numParts.phoneNum ) {
                            fNum1 = numParts.phoneNum;
                        }

                        phoneNumber = PTPN.getPhoneNumber( phoneNumber );//Further parse the phone number with libphonenumber.
                        
                        if ( phoneNumber.errorMsg ) {
                            fNum = phoneSpecs[0];

                            if ( canEdit ) {                                                           
                                error = '<strong>' + fNum + ':</strong> ' + u.errorsPrep( phoneNumber.errorMsg );
                            }
                        } else {
                            fNum        = phoneNumber.formatNational();
                            countryCode = phoneNumber.country;
                            testPhType  = phoneNumber.getType();

                            if ( testPhType && u.types[testPhType] ) {
                                phType = u.types[testPhType];
                            }
                        }
                        
                        countryCode && ( extType = libphonenumber.getExtPrefix( countryCode ) );   
                    }//if ( phoneNum ) {

                    if ( state ) {
                        style = 'border-bottom:1px solid #bbb;';

                        htm += u.country( phoneNumber, state );
                        
                        if ( 'noPhoneNumber' == state ) {
                            htm += u.srchBx();
                            htm += u.extBx();

                            style += 'padding-bottom:1.299999em;';
                        } else {//The user has clicked the pencil icon, attempting to edit the phone number, so show country's combobox, phone number's text box, and ext.'s text box, if available, with existing data.
                            htm += u.srchBx( fNum1 );
                            htm += u.extBx( phoneNumber );
                            
                            if ( error ) {
                                if ( ! isMobile ) {
                                    classErr += '" style="' + width; 
                                }
                                
                                htm += notices( classErr, error, 1 );
                            }
                                                      
                            /*Either the default text boxes or other existing phone numbers are on the page, 
                            so we use a border for visible delineation.*/
                        }
                    } else if ( fNum ) {//Display the phone number.
                        aux = clss1 + pz + 'symbol';
                        
                        htm = '<div' + ahid + ' class="' + aux + '"><span class="' + aux + pz + 'phone mainsprite phone"></span></div>';
                        
                        aux = clss1 + pz + 'number';

                        htm += '<div class="' + aux + '" style="padding-left:32px;"><div class="';
                        htm += aux + pz + 'txt"';
                        
                        //Change the right margin if the user is not able to edit.
                        ! canEdit && ( htm += ' style="padding-right:0;"' );

                        htm += '>'
                        htm += fNum;//Add the phone number.
                        htm += '</div>';

                        if ( phType ) {
                            htm += '<div class="' + aux + pz + 'type">';
                            htm += phType;
                            htm += '</div>';
                        }
                        
                        if ( error ) {
                            htm += notices( classErr, error, 1 );
                        }                        

                        htm += '</div>';
                        
                        //Display the "pencil" icon to enable editing, if user has editing privilege.
                        if ( canEdit ) {
                            htm += '<div class="' + clss1 + pz + 'edit">' + btnGen( { class : clss1 + pz + 'edit' + pz + 'button dashicons dashicons-edit', 'aria-label' : i18nGen[22] + ' ' + fNum, 'data-purp' : 'editphone' } ) + '</div>';
                            fNumWrppr[ 'data-phonenumeditable' ] = 1;
                        }
                        
                        if ( ! isMobile ) {
                            style = width;
                        }
                    }
                    
                    if ( canEdit ) {
                        obj.type   = hid;
                        obj.name   = u.nameAttr;
                        obj[dpurp] = sb1;
                    
                        if ( phoneNum ) {
                            obj.value = phoneNum;
                        }
                        
                        htm += html.input( obj );
                    }

                    style && ( fNumWrppr.style = style );

                    if ( Object.hasOwn( phoneNumber,  oldNum ) ) {
                        fNumWrppr['data-phonenumberold'] = phoneNumber[oldNum];//This phone number will be used to locate itself in the input value attribute.
                    }
                  
                    return html.el( htm, fNumWrppr );
                },//...phones.htm.init
                width : 'width:25em;',
                country : function( phoneNumber, state ) {
                    var country,
                        u     = this,
                        clss1 = u.clss + pz + 'country',
                        clss2 = clss1 + pz + ptSrch,
                        id1   = class2Id( clss2 ),
                        obj   = {
                            class : clss2,
                            label : i18nContact.phones.country,
                            purp  : fneCntry 
                        },
                        options = [],
                        cCode   = '',
                        htm     = '';
                    
                    if ( phoneNumber &&  phoneNumber.nationalNumber ) {
                        if ( phoneNumber.country ) {
                            cCode = phoneNumber.country;
                            
                            country = u.findCountry( cCode );
                        }
                        
                        obj.attr = {
                            'data-phonenumber' : phoneNumber.nationalNumber,
                            'data-countrycode' : cCode
                        }
                        
                        //Make the phone number a part of the id so that the id is unique.
                        id1 += '-' + ++u.uniqueId;
                    }

                    if ( ! country ) {
                        country = labels.cntry;

                        options.push( {
                            value : '',
                            label : country
                        } );
                    }
                    
                    obj.id = id1;
                    
                    //Is the user trying to edit phone number?
                    if ( state && 'default' != state ) {
                        u.selectId = id1; //This ID enables adding select element to jquery's selectmenu widget after page has been loaded.
                    }

                    PTPN.countries.forEach( function( countryCode1 ) {
                        var c = u.findCountry( countryCode1 ),
                            h = { value : countryCode1, label : c }
                        
                        if ( country == c ) {
                            h.selected = $tru;
                        }

                        options.push( h );
                    });

                    obj.option = options;

                    return html.el( select( obj ), { class : clss1 } );
                },//country
                /**
                 * Fetches country name.
                 * 
                 * @param string countryCode Two-letter country code.
                 * @return string Name of country.
                 */
                findCountry : function( countryCode ) {
                    var countryName;

                    if ( 'AC' == countryCode ) {
                        countryName = 'Ascension Island';
                    } else  if ( 'TA' == countryCode ) {
                        countryName = 'Tristan da Cunha';
                    } else {
                        countryName = PTGLR.findCountry( countryCode ).name;
                    }

                    return countryName; 
                },//findCountry
                /**
                 * Creates span element with country's flag as background.
                 * 
                 * @param string countryCode The two-letter code for the country.
                 * @param string class1      Additional class that should be added to the span element (optional).
                 * @return string span element with country's flag as background.
                 */
                countryFlag : function( countryCode, class1 ) {
                    var obj = { 'aria-hidden' : $tru, class :  this.flagExists( countryCode ) ? ( 'fflag ff-md fflag-' + countryCode ) : 'mainsprite flag-24' };

                    class1 && ( obj.class += ' ' + class1 );

                    return html.el( '', obj, 'span' );   
                },//countryFlag                
                /**
                 * Fetches the name of country based on two-letter country's code.
                 * 
                 * @param string countryCode Two-letter country's code.
                 * @param string class1      Additional class that should be added to the span element (optional).
                 * @return string span element with name of country.
                 */
                countryTxt :  function( countryCode, class1 ) {
                    return html.el( this.findCountry( countryCode ) , { class : class1 }, 'span' );
                },//countryTxt
                /**
                 * Determines whether we have a flag for a country.
                 * 
                 * @param string countryCode Two-letter country code for the country in question.
                 * @return boolean True if the country's code is not among codes for which we don't have a flag, otherwise false.
                 */
                flagExists : function( countryCode ) {
                    return !['AC','SJ','MF','IO','TA'].includes( countryCode );
                },//flagExists
                /**
                 * Decides to display either flag or name of a country based on availability.
                 * 
                 * @param string countryCode Two-letter country's code.
                 * @param string clss1       The value for the class attribute belonging to the element that will display either flag or country.
                 * @return string country's name or flag.
                 */
                flagOrName : function( countryCode, clss1 ) {
                    var u = this;
                    return u.flagExists( countryCode ) ? u.countryTxt( countryCode, clss1 + acc ) + u.countryFlag( countryCode, clss1 ) : u.countryTxt( countryCode, clss1 + 'txt' );
                },//flagOrName
                srchBx : function( phoneNumber ) {
                    var t     = 'input',
                        def   = labels.fNum,
                        clss1 = this.clss + pz + 'number',
                        obj   = { type : 'text', class : clss1 + pz + t, 'aria-label' : def, placeholder : def, 'data-info' : $fne };
             
                    if ( phoneNumber ) {
                        obj.value = phoneNumber;
                    } else {
                        obj.disabled = 'disabled';
                    }

                    return html.el( html.input( obj ), { class : clss1 } );
                },//srchBx
                /**
                 * Creates text box for the phone number's ext.
                 * 
                 * @param object phoneNumber Phone number and its specs.
                 * @return string ext.'s text box, otherwise an empty string.
                 */
                extBx : function( phoneNumber ) {
                    if ( ! phoneNumber ) phoneNumber = {};
                    var u     = this,
                        clss1 = u.clss + pz + 'ext',
                        obj   = { type : 'text', class : clss1 + pz + 'input', 'data-info' : $ext, placeholder : 'Ext.' },
                        htm   = '',
                        ext   = '',
                        numParts;
                    
                    if ( phoneNumber.phoneNumber || phoneNumber.phoneNumberOld ) {
                        obj[albl] = u.extLabel( phoneNumber.phoneNumber );
                        
                        if ( phoneNumber.ext ) {
                            ext = phoneNumber.ext;
                        } else {
                            if ( ! phoneNumber.phoneNumber ) {
                                phoneNumber.phoneNumber = phoneNumber.phoneNumberOld;
                            }

                            numParts = u.splitPhoneNum( phoneNumber );

                            if ( numParts.ext ) {
                                ext = numParts.ext;
                            }
                        }
                       
                        //Check if a country code exists, and display, as the placeholder, the country's specific extention's abbreviation (x or ext., for example).
                        if ( phoneNumber.country ) {
                            obj.placeholder = libphonenumber.getExtPrefix( phoneNumber.country );
                        }

                        ext && ( obj.value = ext );
                    } else {
                        obj.disabled = 'disabled';
                    }
                    
                    if ( i18nGen[8] != 'extension' ) {
                        obj.placeholder = i18nGen[8];
                    }

                    return html.el( html.input( obj ), { class : clss1 } );
                },//extBx

                splitPhoneNum : function ( phoneNumber ) {
                    if ( ! phoneNumber ) phoneNumber = {};
                    var arr = phoneNumber.nationalNumber ? String( phoneNumber.nationalNumber ).split( ' ' ) : [],
                        len = arr.length,
                        obj = {},
                        ext;
                    
                    //If the element that precedes the last element is not a number, the last element is an extention.
                    if ( ( 1 < len ) && /[^0-9\(\)\-]+/g.test( arr[ len - 2 ] ) ) {
                        ext = arr[ len - 1 ]
                    }
                    
                    if ( ext ) {
                        arr.pop();
                        arr.pop();
                    }
                    
                    if ( len ) {
                        obj.phoneNum = arr.join( ' ' );
                    }
                    
                    if ( ext ) {
                        obj.ext = ext;
                    }

                    return obj;
                },
                /**
                 * Creates the aria-label value for ext. text box.
                 * 
                 * @param string phoneNumber The phone number.
                 * @return string the aria-label value.
                 */
                extLabel : function( phoneNumber ) {
                    return phoneNumber + ' ' + labels.ext;
                },//extLabel
                
                /**
                 * Wraps error message with html.
                 * 
                 * @param string error The error code.
                 * @return string An explanation of the error.
                 */
                errorsPrep : function( error ) {
                    if ( ! canEdit ) return '';

                    error = this.errors[ error ];//Use the code to get the full explanation.

                    //Add the "please try again" message if the user has editing privilege.
                    error += labels.again;

                    return error
                }//errorsPrep
            }//phone.htm
        },//phone
        email : {
            init : function( contact ) {
                var u      = this,
                    obj    = {},
                    htm    = '',
                    addr   = 'address',
                    email,
                    email1 = {},
                    err,
                    c,
                    clss0,  
                    clss1,
                    clss2,
                    id1,
                    nameAttr,
                    err;
                //Check for existing phone numbers: describr[contact][email]
                if ( contact[ eml ] ) {
                    email1 = contact[ eml ];
                    
                    //describr[contact][email][address]
                    if ( Object.hasOwn( email1, addr ) ) {
                        email = email1[addr];
                        err   = u.validate.init( email );
                        email = email;
                    }
                }//if ( contact[ eml ] ) {

                if ( canEdit ) {
                    c               = pz;
                    clss0           = u.clss;
                    clss1           = clss0 + c + addr;
                    clss2           = clss1 + c + 'input';
                    id1             = class2Id( clss2 );
                    nameAttr        = u.name + '[' + eml + ']';//describr[contact][email]
                    obj.type        = 'text';
                    obj.name        = nameAttr + '[' + addr + ']';//describr[contact][email][adddress]
                    obj.placeholder = i18nContact.email.placeholder;
                    obj.id          = id1;
                    obj.class       = clss2;
                    obj[albl]       = labels.email;
                    obj[dinfo]      = eml;

                    if ( email ) {
                        obj.value = email;
                    }

                    htm = html.el( html.input( obj ), {class : clss1 } );
                    err && ( htm += err );

                    //Adds the controls
                    ctrls.clss     = clss0; 
                    ctrls.sctn     = eml;
                    ctrls.nameAttr = nameAttr;

                    htm += ctrls.init( email1 );
                } else if ( email ) {
                    htm = email;
                }
                
                return htm;
            },//init
            validate : {
                /**
                 * Validates email.
                 * 
                 * We test for some email formats that are not allowed instead of those allowed because both the number of characters allowed and different formats are vast.
                 * Our goal is to be as liberal as possible with allowed characters while preventing the most obvious disallowed characters.
                 * For example, we don't test for a top-level domain at the end of the email address as doing so would retrict an email address with "localhost" as the domain.
                 * @param string email The email to validate.
                 * @return strong error message if email has either disallowed characters or incorrect format, otherwise an empty string.
                 */
                init : function( email ) {
                    if ( ! ( canEdit && email ) ) return '';
                    var error = this.errors,
                        err   = '',
                        code;
                    
                    //Testing for a minimum of 3 characters, the @ sign and one character on either side, is very liberal.
                    if ( 3 > email.length ) {
                        code = 'TOO_SHORT';
                    }
                    else if ( ! /@/.test( email ) ) {//An email address must have at east one @ sign.
                        code = 'NO_AT';
                    }

                    //An email address can't have any of these conditions:
                    //1) start or end with either a dot (.) or @; 
                    //2) dot on either side of @ sign if not in double quotes; 
                    //3) consecutive dots, consecutive @@, or space if not in double quotes;
                    //4) double or single quotes on the right side of the @ sign;
                    //or 5) a quote that is not double quoted. 
                    else if ( /^(\.|@)|(\.|@)$/.test( email ) || ( /(\.@|@\.|\.{2,}|@{2,}|\s+|\\)/.test( email ) && ! /".*(\.@|@\.|\.{2,}|@{2,}|\s+|\\)+.*"/.test( email ) ) || /"(?!.*@+)/.test( email ) || 1 == ( String( email ).match( /"/g ) || [] ).length ) {
                        code = 'INVALID';// || /"(?!(.*@))/.test( email ) || ! /"(?=.*("|"@) )/.test( email )
                    }
                    
                    if ( code ) err = error.init( code );
                    
                    return err; 
                },
                errors : {
                    init : function( error ) {
                        error = this[error];//Use the code to get the full explanation.

                        //Add the "please try again" message if the user has editing privilege.
                        error += labels.again;
                    
                        return notices( 'error', error, !0 );
                    },//init
                    TOO_SHORT : i18nContact.email.errors[0],
                    NO_AT     : i18nContact.email.errors[1],
                    INVALID   : i18nContact.email.errors[2]
                }//errors
            }//validate
        }//email
    };//bi.contact
    
    bi[tz] = {
        init : function () {
            var u        = this,
                clss1    = plugin + pz + tz,
                clss2    = clss1 + pz + sh,
                clss3    = clss2 + pz +  ptSrch,
                exist    = ptUser[tz] || {},
                nameAttr = plugin + '[' + tz + ']',
                lbl      = labels[tz],
                obj      = {},
                obj1     = {},
                curTz    = '',//for display
                curTz1   = '',//for input element
                htm      = '',
                defTz,
                id1;

            //labels[tz]
            u.clss = clss3;//this class

            //describr[timezone][name]
            if ( exist.name ) {
                curTz = exist.name;
                
                if ( '0' == curTz ) {
                    curTz = '+' + curTz;
                }

                curTz1 = curTz;
            }

            if ( canEdit ) {
                obj.tz = {};
                
                if ( ! curTz ) {
                    /**
                     * Here we set America/New York as the default time zone.
                     *  
                     * @var object describrtz Contains the time zones and is documented in "plugin's name/dist/js/timezones.min.js"
                     */
                    defTz  = describrtz['America'][99];
                    curTz1 = defTz.value;
                }
                
                obj.tz.cur = curTz1;

                id1 = class2Id ( clss3 );

                obj.class = clss3;
                obj.label = lbl;
                obj.purp  = tz;              
                obj.id    = id1;
                
                obj1.type   = hid;
                obj1.name   = nameAttr + '[name]';
                obj1[dpurp] = sb1;

                if ( curTz1 ) {
                    obj1.value = curTz1;//input value
                }
                
                obj.extra = [ html.input( obj1 ) ];
                
                htm = select( obj );
                
                ctrls.clss     = clss2;
                ctrls.nameAttr = nameAttr;
                ctrls.sctn     = tz;

                htm += ctrls.init( exist );
            } else if ( curTz ) {
                htm = PTGLR.tzRemoveContinent( PTGLR.findTz( curTz ) );
            }
            
            if ( htm ) {
                htm = html.template({
                    table : [{
                        clss  : clss1,
                        th    : lbl,
                        body  : [{
                            attr : {
                                class : clss2,
                            },
                            cntnt : htm
                        }]
                    }]
                });
            }

            return htm;
        }//init        
    };//timezone
    
    bi[$soc$] = {
        init : function() {
            var u     = this,
                clss1 = plugin + pz + $soc$,
                clss2 = clss1 + pz + sh,
                htm   = '';
            
            u.html.clss  = clss2 + pz + 'network';
            u.html.clss1 = clss2;

            htm = u.html.init();
            
            u.global.types = u.html.select.types;

            if ( htm ) {
                htm = html.template({
                    table : [{
                        clss  : clss1,
                        th    : labels[$soc$],
                        body  : [{
                            attr : {
                                class : clss2,
                            },
                            cntnt : htm
                        }]
                    }]
                });
            }

            return htm;
        },//init
        html : {
            init : function () {
                var u        = this,
                    clss1    = u.clss,
                    exist    = ptUser[$soc$] || {},
                    clssAux  = 'link',
                    clssAux1 = 'click',
                    nameAttr = '',
                    htm      = '',
                    href;

                if ( canEdit ) {
                    if ( ! u.select.clss ) {
                        u.select.clss = clss1 + pz + 'combobox';
                    }

                    nameAttr = plugin + '[' + $soc$ + ']';

                    u.nameAttr = nameAttr;
                }
                
                if ( exist.networks ) {
                    exist.networks.forEach( function ( entry ) {
                        //Test and validate entry before using it.
                        var matches = String( entry ).match( PTGLR.social.regXFull ),
                            data    = {},
                            network,
                            networkName,
                            handle;
                        if ( matches ) {
                            data.network = matches[1];
                            data.handle = matches[2];
                            
                            network = data.network;
                            
                            networkName = u.select.types[ network ];
                            
                            if ( networkName ) {
                                if ( canEdit ) {
                                    htm += u.txtBx( data );
                                } else {
                                    handle = data.handle;

                                    //Not linkable if network is either oculus or telegram.
                                    if ( 'os' != network && 'tm' != network && 'wp' != network ) {
                                        href = 'http://' + networkName.toLowerCase();
                                        
                                        //We don't add dot plus TLD for the ask.fm network, because ".fm" already serves this purpose.
                                        if ( 'am' != network ) {
                                            href +='.com'
                                        }

                                        href += '/' + handle;

                                        handle = html.el( handle, { class : clss1 + pz + clssAux + pz + clssAux1, href : href, target : '_blank' }, 'a' );
                                    }

                                    htm += html.el( subsctn( { class : { main : clss1, cntnt : clssAux, subcon : clssAux1 }, title : networkName, icon : network, cntnt : handle } ), { class : clss1 } );
                                }
                            }
                        }
                    });
                }//if ( exist.network )

                if ( canEdit ) {
                    htm += u.txtBx();

                    ctrls.clss     = u.clss1;
                    ctrls.sctn     = $soc$;
                    ctrls.nameAttr = nameAttr;

                    htm += ctrls.init( exist );
                }
                
                return htm;
            },//init
            /**
             * Creates both the input element of type text and the input element of type hidden for the social network.
             * 
             * @param object data{
             *  string network The two- or three-letter code for the social network.
             *  string handle The username used by the owner of this profile on the social network.
             * }
             * @return string Both input elements.
             */
            txtBx : function ( data ) {
                var u       = this,
                    def     = labels[$soc$+1],
                    input   = newObj( defTxtBx ),
                    input1  = { type : hid, name : u.nameAttr + '[networks][]' },
                    network = '',
                    handle  = '',
                    entry;

                input.class = u.clss + pz + 'input';

                input[albl]  = def;
                input[dinfo] = $soc$;
                input[phldr] = def;

                input1[dpurp] = sb1;
                
                /*One forward slash separates social network (facebook) from handle (username).
                 Two forward slashes separate the network and handle from the date the link was created or updated. 
                 Three consecutive forward slashes both separate old handle from new handle and separate networks in the database .
                 ['socialnetworks'][network][] = 'fb/kris///yt/junior//2023-07-14 12:23:59'*/
                
                if ( data ) {
                    network      = data.network;
                    handle       = data.handle;
                    entry        = network + '/' + handle;
                    input.value  = handle;
                    input1.value = entry;
                }
                
                //Return the combobox for selecting the social network, the text box for typing the handle, and the hidden input element for submission.
                return html.el( u.select.init( network, handle ) + html.input( input ) + html.input( input1 ), { class : u.clss } );
            },//txtBxes
            select : {
                uniqueId : 0,
                init : function( network, handle ) {
                    var u     = this,
                        clss1 = u.clss,
                        id1   = class2Id( clss1 ) + '-',
                        obj   = { label : labels[$soc$+0], purp : $soc$, class : clss1, option : [] },
                        types = u.types,
                        m;
                    
                    network = network || 'fb';//Facebook is the default social network.

                    if ( network && handle ) {
                        id1 += String( network + handle ).replace( /[^a-z0-9_-]+/ig,'' ) + '-' + u.uniqueId++;
                    } else {
                        id1 += 'new';
                    }
                    
                    obj.id = id1;
                    obj.attr = { 'data-curnet' : network }

                    for ( m in types ) {
                        var $obj = {
                            value : m,
                            label : types[m]
                        }

                        if ( network == m ) {
                            $obj.selected = $tru;
                        }

                        obj.option.push( $obj );
                    }

                    return select( obj );
                },
                types : {
                    fb  : 'Facebook',
                    yt  : 'YouTube',
                    wp  : 'WhatsApp',
                    ig  : 'Instagram',
                    tk  : 'TikTok',
                    st  : 'Snapchat',
                    pt  : 'Pinterest',
                    rt  : 'Reddit',
                    ln  : 'LinkedIn',
                    tr  : 'Twitter',
                    th  : 'Twitch',
                    tm  : 'Telegram',
                    gb  : 'Github',
                    wt  : 'WeChat',
                    qq  : 'QQ',
                    dn  : 'Douyin',
                    wo  : 'Weibo',
                    ku  : 'Kuaishou',
                    vk  : 'VKontakte',
                    le  : 'Line',
                    kk  : 'kik',
                    am  : 'Ask.fm',
                    sy  : 'Spotify',
                    sd  : 'Soundcloud',
                    se  : 'Skype',
                    ok  : 'Odnoklassniki',
                    os  : 'Oculus',
                    klk : 'KakaoTalk',
                    tmr : 'Tumblr'
                }//types
            }//media
        }//html
    }//socialMedia
    
    //Add the method is used to update the submitted value. 
    //See the listeners for both the blur event on the handle's text box and the click event on network's option
    bi[$soc$].global = newObj( PTGLR.social );

    //bi[$soc$].global.update method checks to make sure the user-selected network is one that we prescribe, 
    //so here we give that method access to the social networks.
    bi[$soc$].global.types = bi[$soc$].html.select.types;
    
    bi[wb]      = newObj( PTGLR.url );
    bi[wb].init = function () {
        var u = this,
            clss1    = plugin + pz + wb,
            clss2    = clss1 + pz + sh,
            clss3    = clss2 + pz + 'address',
            exist    = ptUser[wb] || {},
            clssAux  = 'link',
            clssAux1 = 'click',
            nameAttr = '',
            htm      = '';

        if ( canEdit ) {
            u.clss = clss3;

            nameAttr = plugin + '[' + wb + ']';

            u.nameAttr = nameAttr;
        }

        if ( exist[addr] ) {
            exist[addr].forEach( function ( entry ) {
                if ( u.full.test( entry ) ) {
                    if ( canEdit ) {
                        htm += u.txtBx( entry );
                    } else {
                        var url = html.el( u.decode( entry ), { class : clss3 + pz + clssAux + pz + clssAux1, href : u.encode( entry ), target : '_blank' }, 'a' );

                        htm += html.el( subsctn( { class : { main : clss3, cntnt : clssAux, subcon : clssAux1 }, title : labels[wb+0], icon : clssAux, cntnt : url } ), { class : clss3 } );
                    }
                        
                }
            });
        }//if ( exist[addr] )

        if ( canEdit ) {
            htm += u.txtBx();

            ctrls.clss     = clss2;
            ctrls.sctn     = wb;
            ctrls.nameAttr = nameAttr;

            htm += ctrls.init( exist );
        }
                
        if ( htm ) {
            htm = html.template({
                table : [{
                    clss  : clss1,
                    th    : labels[wb],
                    body  : [{
                        attr : {
                            class : clss2
                        },
                        cntnt : htm
                    }]
                }]
            });
        }

        return htm;
    };//init

    /**
     * Creates the input element of type text for the website address.
     * 
     * @param string url The website address to set as the text box's value.
     * @return string The text box.
     */
    bi[wb].txtBx = function ( url ) {
        var u      = this,
            defVal = labels[wb+0],
            input  = newObj( defTxtBx );
    
        input[albl]       = defVal;
        input[dinfo]      = wb;
        input.placeholder = defVal; 
        input.name        = u.nameAttr + '[' + addr + '][]';
        input.class       = u.clss + pz + 'input';   
        if ( url ) {
            input.value = u.decode( url );
        }

        return html.el( html.input( input ), { class : u.clss } );
    };//txtBx
    
    bi[wrk] = {
        from     : newObj( $from ),
        to       : newObj( $to ),
        descrptn : newObj( $descr )
    };

    bi[wrk].init = function () {
        var u        = this,
            clss1    = plugin + pz + wrk,//describr__workhistory
            clss2    = clss1 + pz + sh,//describr__workhistory__show
            clss3    = clss2 + pz + 'job',//describr__workhistory__show__job
            clssAux1 = pz + dp + pz,
            pr       = 'present',
            exist    = ptUser[wrk] || {},
            f        = 'from',
            t        = 'to',
            p        = pz + 'timeperiod' + pz,
            htm      = '',
            nJobs    = 0,
            nameAttr = plugin + '[' + wrk + ']',
            descr,//description
            from,
            to;

        from = u.from;//created immediately below bi[wrk].
        to   = u.to;//created immediately below bi[wrk]. 

        u.clss = clss3;

        //Set immutable values for the description object, which is created immediately below bi[wrk].
        descr = u.descrptn;
        descr.clss        = clss3;
        descr.mxLen       = textarea_LG;
        descr.placeholder = i18nGen[30];
        descr.label       = i18n.company[0];
        descr.purp        = wrk;

        from.typeVal = wrk + f;//workhistoryfrom
        from.sub     = wrk;
        from.clss    = clss3 + p + f;
        from.nameAttr = nameAttr;

        to.typeVal  = wrk + t;//workhistoryto
        to.sub      = wrk;
        to.clss     = clss3 + p + t;
        to.future   = 1;
        to.nameAttr = nameAttr;

        exist.jobs && exist.jobs.sort( cmpDates ).forEach( function ( job ) {
            if ( canEdit ) {
                htm += u.setup( nJobs, job );

                nJobs++;
            } else {
                var x = '', A = '';
                    
                if ( job.company ) {
                    if ( job.title ) {
                        A += html.el( job.title, '', 'strong' );
                        A += ' ' + i18n.company[1] + ' ';
                    }

                    x += html.el( A + job.company, { class : clss3 + clssAux1 + 'position-company' } );
                        
                    A = '';

                    if ( job.timeperiod ) {
                        A += job.timeperiod;
                    }

                    if ( job.city ) {
                        if ( A ) {
                            A += ' ' + i18nGen[31] + ' ';
                        }
                            
                        A += job.city;
                    }
                        
                    if ( A ) {
                        x += html.el( A, { class : clss3 + clssAux1 + 'timeperiod-city' } );
                    }

                    if ( job.description ) {
                        x += html.el( job.description, { class : clss3 + clssAux1 + 'description' } );
                    }
                }
                    
                htm += html.el( subsctn( { class : { main : clss3, cntnt : dp }, icon : 'worker', cntnt : x } ), { class : clss3 } );
            }
        });

        if ( canEdit ) {
            htm += u.setup( nJobs );

            ctrls.clss     = clss2;
            ctrls.sctn     = wrk;
            ctrls.nameAttr = nameAttr;

            htm += ctrls.init( exist );
        }
            
        if ( htm ) {
            htm = html.template({
                table : [{
                    clss  : clss1,
                    th    : labels[wrk],
                    body  : [{
                        attr : {
                            class : clss2
                        },
                        cntnt : htm
                    }]
                }]
            });
        }

        return htm;
    };//init
    /**
     * @param int    i   The key used to locate the job in the array server-side
     * @param object job The particulars of the job.
     * @return string The text boxes and textarea for the user to type in job's particulars.
     */
    bi[wrk].setup = function ( i, job ) {
        job = job || {};
        var u       = this,
            input   = newObj( defTxtBx ),
            city    = newObj( attrCbx ),
            descr   = u.descrptn,
            clss1   = u.clss,//describr__workhistory__show__job
            clss2   = clss1 + pz + 'city',//describr__workhistory__show__job__city
            clss3   = clss1 + pz + 'timeperiod',//describr__workhistory__show__job__timeperiod
            clss4   = clss3 + pz + 'present',//describr__workhistory__show__job__timeperiod__present
            clss5   = clss1 + pz + 'company',
            clss6   = clss1 + pz + 'position',
            $input  = pz + 'input',
            id3     = class2Id( clss4 ) + '-' + chkbx + '-' + i,
            id1     = class2Id( clss2 ) + '-' + i,
            attr    = plugin + '[' + wrk + '][' + i + ']',
            city1   = { type : hid, name : attr + '[city]' },
            htm     = '',
            present = { type : chkbx, name : attr + '[present]', 'data-id' : i, 'data-purp' : plugin + 'togglewrktimeperiodtochckbx', value : 1, id : id3 },
            from    = job.from || '',
            to      = job.to || '',
            defVal,
            cityCtrls,
            id2,
            tofrom;

        present[actrl] = class2Id( clss3 ) + '-to-' + i;

        //There shouldn't be any user-supplied description since we have yet to check and set any.
        if ( descr.description ) {
            descr.description = '';
        }

        input[albl]  = i18n.company[3];
        input[phldr] = i18n.company[4];; 
        input.name   = attr + '[company]';
        input.class  = clss5 + $input;
        
        //descr can't be overwritten, so we set any available user-supplied description here.
        if ( job.description ) {
            descr.description = job.description;
        }

        if ( job.company ) {
            input.value = job.company;
        }       

        htm += html.el( html.input( input ), { class : clss5 } );//company

        defVal = i18n.company[5];

        input[albl]       = defVal;
        input.placeholder = defVal; 
        input.name        = attr + '[title]';
        input.class       = clss6 + $input;

        if ( job.title ) {
            input.value = job.title;
        } else if ( 'undefined' !== typeof input.value ) {
            delete input.value;
        }

        htm += html.el( html.input( input ), { class : clss6 } );//job title
            
        defVal = i18nGen[23];
            
        cityCtrls = id1 + '-select';
        id2       = id1 + '-input';

        city[actrl] = cityCtrls;
        city[albl]  = defVal;
        city[dinfo] = wrk;
        city[phldr] = defVal;
        city.class  = clss2 + $inputAuto;
        city.id     = id2;
                
        if ( job.city ) {
            city.value  = job.city;
            city1.value = job.city;
        }
        
        city1[dpurp] = sb1;

        htm += html.el( html.input( city ) + html.input( city1 ) , { class : clss2 } );//city

        descr.nameAttr = attr;

        htm += descr.init();//description's textarea

        tofrom = u.from.init( i, from )//from HTML

        if ( to ) {
            tofrom += u.to.init( i, to )//to HTML
        } else {
            //If the user didn't select an end date, we assume the user is still working at this job.
            present.checked = 'checked';
        }

        //Attach present checkbox to the label for said checkbox.
        present = html.el( html.input( present ) + html.el( i18n.company[6], { for : id3, class : clss4 + pz + 'label' }, 'label' ) , { class : clss4 } );
            
        //Wrap present, to and from.
        htm += html.el( html.el( i18nGen[29], { class : clss3 + pz + 'header' } ) + present + tofrom, { class : clss3 } );

        return html.el( htm, { class : clss1 } );
    }//setup
    
    bi[edu] = {
        init : function () {
            var u     = this,
                clss_ = plugin + pz + edu,
                htm$  = '',
                $p    = pz + 'timeperiod' + pz,
                $f    = 'from',
                $t    = 'to',
                templ = { table : [] },
                k;
            
            for ( k in edus ) {
                if ( edu != k ) {
                    u[k] = {
                        from     : newObj( $from ),
                        to       : newObj( $to ),
                        descrptn : newObj( $descr )
                    };

                    var clss$    = clss_ + pz + k,
                        $clss    = clss$ + pz + sh,
                        $clss$   = $clss + pz + k.slice( 0, k.length-1 )/*Remove the "s" to identify the specific sub section.*/,
                        clssAux1 = pz + dp + pz,
                        $d       = i18nGen[30],
                        exist    = ptUser[k] || {},
                        ni       = 0,
                        nameAttr = plugin + '[' + k + ']',
                        $htm     = '';
                                    
                    u[k].descrptn.clss        = $clss$;
                    u[k].descrptn.mxLen       = textarea_LG;
                    u[k].descrptn.placeholder = $d;
                    u[k].descrptn.label       = edus[k].exp;
                    u[k].descrptn.purp        = k;
                    
                    u[k].from.clss     = $clss$ + $p + $f;
                    u[k].from.sub      = k;
                    u[k].from.typeVal  = k + $f;
                    u[k].from.nameAttr = nameAttr;

                    u[k].to.clss     = $clss$ + $p + $t;
                    u[k].to.sub      = k;
                    u[k].to.typeVal  = k + $t;
                    u[k].to.future   = 4;
                    u[k].to.nameAttr = nameAttr;

                    u[k].setup = function ( i , instn ) {
                        instn = instn || {};
                        var m       = this,
                            input   = newObj( defTxtBx ),
                            descr   = m.descrptn,
                            clss1   = $clss$,//describr__edu__[k]
                            clss2   = clss1 + pz + 'timeperiod',//describr__edu__[k]__show__timeperiod
                            clss3   = clss2 + pz + 'present',//describr__edu__[k]__show__present
                            clss$   = clss1 + pz,
                            id3     = class2Id( clss3 ) + '-' + chkbx + '-' + i,
                            attr    = plugin + '[' + k + '][' + i + ']',
                            gr      = 'graduated',
                            present = { type : chkbx, name : attr + '[' + gr + ']', value : 1, id : id3 },
                            n       = 'name',
                            $n      = '',
                            htm     = '',
                            from    = instn.from || '', 
                            to      = instn.to || '', 
                            tofrom;
                        
                        descr.nameAttr = attr;   
                        
                        input[albl]       = edus[k].lbl;
                        input.placeholder = edus[k].lbl; 
                        input.name        = attr + '[name]';
                        input.class       = clss$ + n + pz + 'input';
                        
                        if ( instn.description ) {
                            descr.description = instn.description;
                        } else if ( 'undefined' !== typeof descr.description ) {
                            delete descr.description;
                        }

                        if ( instn[n] ) {
                            input.value = instn[n];
                        }
                            
                        htm += html.el( html.input( input ), { class : clss$ + n } );//high school or college
                            
                        if ( 'colleges' == k ) {
                            n = i18n.schools.college[2];
                                
                            $n = 'major';

                            input[albl]  = n;
                            input[phldr] = n; 
                            input.name   = attr + '[' + $n + ']';
                            input.class  = clss$ + $n + pz + 'input';   
                            
                            if ( instn[$n] ) {
                                input.value = instn[$n];
                            } else if ( 'undefined' !== typeof input.value ) {
                                delete input.value;
                            }

                            htm += html.el( html.input( input ), { class : clss$ + $n } );

                            n = i18n.schools.college[3];
                                
                            $n = 'minor';

                            input[albl]  = n;
                            input[phldr] = n; 
                            input.name   = attr + '[' + $n + ']';
                            input.class  = clss$ + $n + pz + 'input';

                            if ( instn[$n] ) {
                                input.value = instn[$n];
                            } else if ( 'undefined' !== typeof input.value ) {
                                delete input.value;
                            }
                                
                            htm += html.el( html.input( input ), { class : clss$ + $n } );

                            n = i18n.schools.college[4];
                                
                            $n = 'degree';

                            input[albl]  = n;
                            input[phldr] = n; 
                            input.name   = attr + '[' + $n + ']';
                            input.class  = clss$ + $n + pz + 'input';

                            if ( instn[$n] ) {
                                input.value = instn[$n];
                            } else if ( 'undefined' !== typeof input.value ) {
                                delete input.value;
                            }
                                
                            htm += html.el( html.input( input ), { class : clss$ + $n } );
                        }//'colleges' == k

                        htm += descr.init();//description's textarea

                        tofrom = m.from.init( i, from ) + m.to.init( i, to ); 
                             
                        if ( instn.graduated ) {
                            //If the user didn't select an end date, we assume the user is still working at this school.
                            present.checked = 'checked';
                        }

                        //Attach present checkbox to the label for said checkbox.
                        present = html.el( html.input( present ) + html.el( i18n.schools.general[0], { for : id3, class : clss3 + pz + 'label' }, 'label' ) , { class : clss3 } );
            
                        //Wrap present, to, and from.
                        htm += html.el( html.el( i18nGen[29], { class : clss2 + pz + 'header' } ) + present + tofrom, { class : clss2 } );

                        return html.el( htm, { class : clss1 } );
                    }//setup

                    exist.schools && exist.schools.sort( cmpDates ).forEach( function ( instn ) {
                        var x = '', A = '', name = '';
                        
                        if ( canEdit ) {
                            $htm += u[k].setup( ni, instn );

                            ni++;
                        } else if ( instn.name ) {
                            name = instn.name;

                            if ( 'colleges' == k ) {
                                if ( instn.degree ) {
                                    A += instn.degree; 
                                }

                                if ( instn.major ) {
                                    if ( A ) {
                                        A += ' ' + i18nGen[31] + ' ';
                                    }

                                    A += html.el( instn.major, '', 'strong' );
                                }

                                if ( A ) {
                                    x += html.el( A, { class : $clss$ + clssAux1 + 'intro' } );
                                }
                            }
                                
                            if ( 'highschools' == k ) {
                                name = instn.graduated ? sprintf( i18n.schools.highschool[0], name ) : sprintf( i18n.schools.highschool[1], name );
                            }

                            if ( x ) {
                                x += html.el( name, { class : $clss$ + clssAux1 + 'name' } );
                            } else {
                                x = html.el( name, { class : $clss$ + clssAux1 + 'intro' } );
                            }

                            if ( instn.minor ) {
                                x += html.el( instn.graduated ? sprintf( i18n.schools.college[0], instn.minor ) : sprintf( i18n.schools.college[1], instn.minor ) , { class : $clss$ + clssAux1 + 'minor' } );
                            }

                            if ( instn.timeperiod ) {
                                x += html.el( instn.timeperiod, { class : $clss$ + clssAux1 + 'timeperiod' } );
                            }

                            if ( instn.description ) {
                                x += html.el( instn.description, { class : $clss$ + clssAux1 + 'description' } );
                            }

                            $htm += html.el( subsctn( { class : { main : $clss$, cntnt : dp }, icon : 'school', cntnt : x } ), { class : $clss$ } );

                        }
                    });//exist.schools                       
                        
                    if ( canEdit ) {
                        $htm += u[k].setup( ni );

                        ctrls.clss     = $clss;
                        ctrls.sctn     = k;
                        ctrls.nameAttr = nameAttr;

                        $htm += ctrls.init( exist );
                    }

                    if ( $htm ) {
                        templ.table.push({
                            clss  : clss$,
                            th    : edus[k].lbl,
                            body  : [{
                                attr  : { class : $clss },
                                cntnt : $htm
                            }]
                        });
                    }                    
                }//edu != k
            }//for ( k in edus )
            
            if ( templ.table.length ) {
                templ.header = edus[edu];
                htm$ = html.template( templ )
            }

            return htm$;
        }
    };
    
    //Notifies the user that data are available
    bi.notifyUser = function () {
        var notifyUser = '';

        if ( userName ) {
            notifyUser += sprintf(
                i18nPhldr[15],
                userName
            );
        } else {
            notifyUser += i18nGen[33];
        }

        return notifyUser;
    };

    describrBio = bi;
    
    window.describrUserProfile = bi;//for adding the user profile info to other pages

    bi.init();
})(jQuery, window );
