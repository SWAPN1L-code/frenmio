# How Frenmio Works (Explained Simply!)

Welcome! This page explains how the **Frenmio** app works. If you've ever used FaceTime, Zoom, or Discord, you've used an app like this. But how does it actually send your face and voice across the internet? Let's dive in!

## 1. What is Frenmio?
Frenmio is a website where you and your friends can join "rooms" to video chat, text each other, and draw on a massive shared whiteboard together.

It works almost like magic, but in the computer world, we split this magic into two important pieces: **The Client** and **The Server**.

---

## 2. The Two Big Pieces

### Piece A: The Client (The Frontend)
Think of the Client as the **screen you are holding** or the website you are looking at. 
- It asks for permission to use your webcam and microphone.
- It shows the buttons you click.
- It handles the drawing tools when you play on the whiteboard.
- We built this using a superhero tool called **React**. To remember what everyone is doing, it uses a memory-helper called **Zustand** (it basically remembers things like "is your mic muted?" or "who are you texting?").

### Piece B: The Server (The Matchmaker)
Think of the Server as a **Post Office Worker or a Matchmaker**.
If you want to call your friend across the country, your computer doesn't instantly know where your friend's computer is. 
The Server sits in the middle. You tell the Server, *"Hey, I'm waiting in Room 123"*. Your friend tells the Server, *"Hey, I'm joining Room 123"*. The Server introduces you two and says, *"Okay, here are your internet addresses, now go talk directly to each other!"*

Once you are introduced, the server steps back and lets you chat directly.

---

## 3. How a Video Call Actually Starts (Step-by-Step)

1. **Knocking on the Door:** When you go to the website, your browser secretly connects to the Matchmaker Server and says, "Hello, here's my secret ticket (Session ID)."
2. **Joining a Room:** You paste a room link and hit Enter. The Matchmaker checks if the room is too full.
3. **The Handshake:** If the room is good, the Matchmaker taps all your friends on the shoulder and says, *"Someone new is here!"* 
4. **Talking Directly (WebRTC):** Instead of sending your heavy video feed all the way to the Server first, your computers use a superpower called **WebRTC**. WebRTC makes an invisible, super-fast bridge *directly* between your computer and your friend's computer. The Video and Audio fly over this bridge.

---

## 4. Playing at Home vs Playing on the Internet

### Playing at Home (LAN)
If you and your sibling are sitting in the same house using the same Wi-Fi, making a WebRTC bridge is incredibly easy! Your computers just shout their local house addresses, find each other, and start the video call. 

### Playing on the Internet (Online)
If you try to call your friend in a different city, it gets tricky. Houses on the internet have giant walls called **Firewalls** and **NATs** to stop bad guys. Because of these walls, your computers can't see each other easily.

To fix this, Frenmio needs two extra helpers:
1. **STUN Servers:** This is like standing on your roof and asking a helicopter what your house looks like from the outside. It helps your computer find its "Public IP address."
2. **TURN Servers:** If the firewalls are way too thick and a direct bridge fails, the TURN server acts as a super strong relay station. You send your video to the TURN server, and it throws the video over the wall to your friend. 

*(If you ever put Frenmio on the real internet, you MUST add these servers in the code, or else everyone's camera will just be black!)*

---

## 5. How the Whiteboard and Chat Work (No Server Required!)

The coolest part about Frenmio is the Whiteboard. 

Most websites save data to a database. If you draw a smiley face on a normal website, it says:
`Your Computer -> Matchmaker Server -> Database -> Friend's Computer`

But Frenmio is super fast. Remember that invisible WebRTC bridge we built for the video call? Frenmio sends your drawings and text messages across that exact same bridge!
1. You draw a line.
2. The code groups that line into a tiny text packet describing the shape and color.
3. It throws that packet straight across the WebRTC bridge directly to your friends.
4. Their computers instantly draw the exact same line on their screen.

Because it skips the Matchmaker completely, the drawing feels practically instant!
