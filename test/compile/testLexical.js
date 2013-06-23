define(['parse/parse',
        'khepri/compile/check',
        'khepri/lex/lexer',
        'khepri/parse/parser',
        'khepri/parse/expression_parser'],
function(parse,
        check,
        lexer,
        parser,
        expression){
    
    var testParser = function(stream) {
        return parser.parseStream(stream);
    };
    
    return {
        'module': "Lexical",
        'tests': [
            ["Simple Lexical",
            function(){
                var result = check.check(testParser(lexer.lex("var a; a; { a; };")));
                assert.ok(true);
            }],
            ["Simple undefined var Lexical",
            function(){
                assert.throws(function(){
                    check.check(testParser(lexer.lex("b; c;")));
                });
            }],
            ["Order",
            function(){
                assert.throws(function(){
                    check.check(testParser(lexer.lex("b; var b;")));
                });
            }],
            ["Outside of block",
            function(){
                assert.throws(function(){
                    check.check(testParser(lexer.lex("{ var b; }; b;")));
                });
            }],
            ["If body",
            function(){
                assert.throws(function(){
                    check.check(testParser(lexer.lex(" if (true) var b; b;")));
                });
            }],
            ["Multiple in same scope",
            function(){
                assert.throws(function(){
                    check.check(testParser(lexer.lex("var a; var c; var a;")));
                });
                
                var result = check.check(testParser(lexer.lex("var a; { var a; }")));
                assert.ok();
            }],
        ],
    };
});
