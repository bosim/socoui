socoui
======

A very simple UI using the soco python module for accessing Sonos devices. It provides a webinterface
for basic operations like stopping/starting playing, displaying the queue and selecting elements. 
Browsing music library is on the todo list.

Technologies
------------

* Based on Python and the soco module
* Using Flask for backend webserver
* Using Angular.js for frontend

How to install?
---------------

    $ mkdir src/socoui
    $ cd src/socoui
    $ virtualenv .
    $ source bin/activate
    $ pip install -r requirements.txt
    $ python server.py

You can now access the UI using [http://localhost:5000](http://localhost:5000)

Troubleshooting
---------------

* Check you don't have a firewall activated. I don't know yet what ports is required for this to work.

Author
------

* Bo Simonsen <bo@geekworld.dk>
