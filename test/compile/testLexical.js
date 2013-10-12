define(['parse/parse',
        'khepri/compile/lexical',
        'khepri/lex/lexer',
        'khepri/parse/parser',
        'khepri/parse/expression_parser'],
function(parse,
        lexical,
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
                var result = lexical.check(testParser(lexer.lex("var a; a; { a; };")));
                assert.ok(true);
            }],
            ["Simple undefined var Lexical",
            function(){
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("b; c;")));
                });
            }],
            ["Order",
            function(){
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("b; var b;")));
                });
            }],
            ["Outside of block",
            function(){
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("{ var b; }; b;")));
                });
            }],
            ["If body",
            function(){
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex(" if (true) var b; b;")));
                });
            }],
            ["Multiple in same scope",
            function(){
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("var a; var c; var a;")));
                });
                
                var result = lexical.check(testParser(lexer.lex("var a; { var a; }")));
                assert.ok(true);
            }],
            ["Renaming",
            function(){
                var result = lexical.check(testParser(lexer.lex("var a; { var a; }")));
                assert.ok(result.body[0].declarations[0].id.name !== result.body[1].body[0].declarations[0].id.name);
                
                var result = lexical.check(testParser(lexer.lex("{ var a; } var a; ")));
                assert.ok(result.body[0].body[0].declarations[0].id.name !== result.body[1].declarations[0].id.name);
            }],
            
            
            ["Multiple parameter same name",
            function(){
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("(\\x, x -> x*x)(2)")));
                });
                
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("(\\x, a, b, x -> x*x)(2)")));
                });
            }],
            ["Let bindings with same name",
            function(){
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("let x = 3, x = 5 in x;")));
                });
                
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("let x=1,y=3,x=4 in x;")));
                });
                
                var result = lexical.check(testParser(lexer.lex("let x=3 in let x=5 in x;")));
                assert.ok(true);
                var result = lexical.check(testParser(lexer.lex("\\x -> (let x=3 in x) + (let x=5 in x);")));
                assert.ok(true);
            }],
            ["Let patterns with same name",
            function(){
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("let {x} = 3, {x} = 5 in x;")));
                });
                
                assert.throws(function(){
                    lexical.check(testParser(lexer.lex("let x=1,y=3,{'x':[x]}=4 in x;")));
                });
            }],
        ],
    };
});
