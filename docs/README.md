# 2020 Spring HCI Design Projects of "Team NYTM"
Repository for Design Project of KAIST 2020 Spring HCI class

## Introduction
Online Real-time Dancing Platform (NYTM) is a platform that can cooperate with others at the process of dance practicing.
Anyone can make a real-time online room called <b>‘Channel’</b>, and this works as a room for people inside to watch a common choreography video and practice dancing while sharing feedbacks with others.
<b>‘Channel’</b> can be used in various methods. For example, the instructor of the choreography can make channel to give online classes to students, or the user who wants to show and correct his or her moves can make channel to get feedback from others. It can be also used for dance clubs that want to practice online with their members.
The main thing about this platform is that the user can share <b>simultaneous and non-simultaneous online feedbacks</b> about dancing with a common topic: the same choreography video they want to practice. In real-time channel, users can freely share feedback by face-to-face or by leaving comments. Also, after the real-time channel, users can leave feedbacks while watching the recorded channel. In non real-time channel, users can share feedback using video comments and chat.
The <b>community</b> room function was added to create a space where users can freely communicate with each other. At here users can gather users of the same interest and even make channel for their dance practice.

## Main code description
First page of the service is implemented by "index.html", "firststyle.css" and "firstjs.js" in the main repository. At this page, you can search for some channels, log in, check channel that you created and have interests, make channel and enter the community room. The page that represents the search result is in "HCI_DP_NYTM/search frame/newsearch/". And all the other source files are in main repository.
For now only one non-live channel is implemented and you can enter it by clicking main page's "Let's dance with BTS!" channel.
