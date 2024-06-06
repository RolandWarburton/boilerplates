# CHROME REACT EXTENSION BOILERPLATE

This boilerplate uses react, and esbuild to bundle a chrome extension.

It consists of a "popup" dialog which appears in the dropdown in the chrome navigation bar.

```none
-- this is what popup.html looks like in your browser when you click on it
-- it will be a floating window that renders your application
+----------------------------------------+
| tab | tab |                | app | app |
+------------------------+---------+++++++----+
                         |            v       |
                         |                    |
                         |     popup.html     |
                         |                    |
                         |                    |
                         |                    |
                         +--------------------+
```

```none
-- this is what options.html looks like in your browser when opened
-- it will be a whole tab in your browser that renders your applications options window
-- you can put other things here too if you like (other than options)
+----------------------------------------+
| tab | tab |                | app | app |
+-----+++++++----------------------------+
|        v                               |
|                                        |
|                                        |
|              options.html              |
|                                        |
|                                        |
|                                        |
+----------------------------------------+

```
