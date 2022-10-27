const Reservation = require("../models/Reservation");


class LinkedList{
  constructor(head=null, length=0){
    this.head = head;
    this.length = length;
  }
  
  insert = (reservationToBeInserted) => {
    // const reservation = new Reservation(reservationToBeInserted);
    // const head = this.head;
    if(this.head == null) {
      this.head = reservationToBeInserted;
      this.length++;
    }
    else if(this.head != null) {
        var currentNode = this.head;
        
        // for(i=1; i<=this.length;i++) { //currentNode is NOT NULL
      while(currentNode){
          if(this.length == 1) {
            // case 1: linkedList's length is 1 and newReservation is less than the head
            if (reservationToBeInserted.data.returnDate <= currentNode.data.borrowDate) {
              const temp = currentNode;
              this.head = reservationToBeInserted;
              this.head.next = temp;
              this.length++;
              return;
              // case 1.1: linkedList's length is 1 and newReservation is greater than the head
              // put the newReservation to the end of the head
            }
            else if(reservationToBeInserted.data.borrowDate >= currentNode.data.returnDate ) {
              currentNode.next = reservationToBeInserted;
              this.length++;
              return;
            }
          }
          // case 2: linklist's length is more than 1
          else if (this.length > 1){
            // case 5: if reservation is less than the head, and the linklist's len is kroe than 1
            if(reservationToBeInserted.data.returnDate <= currentNode.data.borrowDate) {
                  const temp = currentNode;
                  this.head = reservationToBeInserted;
                  this.head.next = temp;
                  this.length++;
                  return;
                }
           // if in between kag GREATER THAN currentNode             
            else if(currentNode.next != null){
              if(reservationToBeInserted.data.returnDate <= currentNode.next.data.borrowDate && reservationToBeInserted.data.borrowDate >= currentNode.data.returnDate) {
                var temp = currentNode.next;
                reservationToBeInserted.next = temp;
                currentNode.next = reservationToBeInserted;
                this.length++;
                return; 
              }
            }
            // case 4: reservation should be inserted at the end of the linkedlist
            else if(currentNode.next == null && currentNode.data.returnDate <= reservationToBeInserted.data.borrowDate) {
              currentNode.next = reservationToBeInserted;
              this.length++;
              return;
            }
            

          }
        currentNode = currentNode.next;
        }
    }
  }
}
module.exports = LinkedList;